"use client";

import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordReset } from "../lib/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const initialFormState: ActionResult = {
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white hover:bg-blue-700 transition-colors duration-200"
    >
      {pending ? "Loading..." : "Send Reset Link"}
    </button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(
    requestPasswordReset,
    initialFormState
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    if (state.error === "" && state.error !== initialFormState.error) {
      setShowSuccessMessage(true);
    } else {
      setShowSuccessMessage(false);
    }
  }, [state]);

  return (
        <div
      id="forgot-password"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col items-center justify-center"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5] shadow-lg"
        >
          <div className="flex justify-center">
            <Image
              src="/assets/logos/logo-black.svg"
              alt="logo"
              width={120}
              height={40}
              priority
              className="w-auto h-10"
            />
          </div>
          <h1 className="font-bold text-2xl leading-[34px] text-center">Forgot Password?</h1>
          <p className="text-sm text-[#616369] text-center">
            Enter your email address below and we&apos;ll send you a link to reset your password.
          </p>

          {/* Menampilkan pesan error jika ada */}
          {state.error !== "" && (
            <div className="border border-red-300 text-red-500 bg-red-50 p-3 rounded-lg">
              <h4 className="font-semibold">Error</h4>
              <p className="text-sm">{state.error}</p>
            </div>
          )}

          {/* Menampilkan pesan sukses jika tidak ada error */}
          {showSuccessMessage && (
            <div className="border border-green-300 text-green-700 bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold">Success</h4>
              <p className="text-sm">Jika akun dengan email tersebut ada, tautan reset kata sandi telah dikirim.</p>
            </div>
          )}
          
          {/* Input field untuk email */}
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                src="/assets/icons/sms.svg" // Pastikan path icon ini benar
                alt="email icon"
                width={20}
                height={20}
                priority
                className="w-auto h-5"
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black bg-transparent"
              placeholder="Write your email address"
              required
            />
          </div>
          
          {/* Tombol submit dan link kembali */}
          <div className="flex flex-col gap-3">
            <SubmitButton />
            <Link
              href="/sign-in"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] text-[#616369] hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
