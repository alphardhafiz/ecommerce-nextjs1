"use server";

import {
  schemaForgotPassword,
  schemaResetPassword,
  schemaSignIn,
  schemaSignUp,
} from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "../../../../../lib/prisma";
import { generateId } from "lucia";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPasswordResetEmail(
  toEmail: string,
  userName: string,
  resetLink: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: toEmail,
      subject: "Reset your password",
      html: `
       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Permintaan Reset Kata Sandi</h2>
          <p>Halo ${userName},</p>
          <p>Kami menerima permintaan untuk mereset kata sandi Anda. Silakan klik tautan di bawah ini untuk melanjutkan:</p>
          <p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0D5CD7; color: white; text-decoration: none; border-radius: 5px;">
              Reset Kata Sandi Anda
            </a>
          </p>
          <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
          <p>Jika Anda tidak meminta reset kata sandi, mohon abaikan email ini.</p>
          <p>Terima kasih,<br/>Tim Anda</p>
        </div>
      `,
    });
    console.log(`Password reset email sent to ${toEmail} using Resend`);
  } catch (error) {
    console.error("Error sending password reset email with Resend:", error);
    throw new Error("Failed too send password reset email");
  }
}

export async function signIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parse = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: parse.data.email,
      role: "customer",
    },
  });

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const comparePassword = bcrypt.compareSync(
    parse.data.password,
    existingUser.password
  );
  if (!comparePassword) {
    return {
      error: "Password is incorrect",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}

export async function signUp(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parse = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  const hashedPassword = bcrypt.hashSync(parse.data.password, 12);

  try {
    await prisma.user.create({
      data: {
        email: parse.data.email,
        name: parse.data.name,
        password: hashedPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to sign up",
    };
  }

  return redirect("/sign-in");
}

export async function requestPasswordReset(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parse = schemaForgotPassword.safeParse({
    email: formData.get("email"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: parse.data.email,
      role: "customer",
    },
  });

  if (!existingUser) {
    console.log(
      `Password reset requested for non-existent email: ${parse.data.email}`
    );
    return {
      error: "",
    };
  }

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: existingUser.id,
    },
  });

  const token = generateId(40);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  try {
    await prisma.passwordResetToken.create({
      data: {
        id: token,
        userId: existingUser.id,
        expiresAt,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;
    await sendPasswordResetEmail(
      existingUser.email,
      existingUser.name,
      resetLink
    );

    return {
      error: "",
    };
  } catch (err: any) {
    console.error("Error in requestPasswordReset:", err);
    return {
      error: err.message || "Failed to request password reset",
    };
  }
}

export async function resetPassword(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const token = formData.get("token") as string;
  const parse = schemaResetPassword.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  if (!token) {
    return {
      error: "Token is not valid or expired",
    };
  }

  try {
    const storedToken = await prisma.passwordResetToken.findUnique({
      where: {
        id: token,
      },
    });

    if (!storedToken) {
      return {
        error: "Token is not valid or expired",
      };
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      await prisma.passwordResetToken.delete({
        where: {
          id: token,
        },
      });
      return {
        error: "Token is expired",
      };
    }

    const hashedPassword = bcrypt.hashSync(parse.data.password, 12);

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: storedToken.userId },
        data: { password: hashedPassword },
      });

      await lucia.invalidateUserSessions(storedToken.userId);

      await tx.passwordResetToken.delete({
        where: { id: token },
      });
    });
  } catch (err: any) {
    console.error("Error resetting password:", err);
    console.log(err.message);
    return {
      error: err.message || "Reset password is failed. Please try again",
    };
  }
  return redirect("/sign-in");
}
