// app/reset-password/[token]/page.tsx
// Komponen UI untuk halaman reset kata sandi (menggunakan token dari URL)

"use client";

import { ActionResult } from "@/types";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect } from "react"; // Import useState dan useEffect
import { Eye, EyeOff } from "lucide-react"; // Pastikan lucide-react terinstal
import Link from "next/link";
import { resetPassword } from "../../lib/actions";

// State awal untuk form
const initialFormState: ActionResult = {
  error: "",
};

// Komponen tombol submit
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white hover:bg-blue-700 transition-colors duration-200"
    >
      {pending ? "Loading..." : "Reset Password"}
    </button>
  );
}

// Halaman utama untuk reset kata sandi
export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
  // Menggunakan useFormState untuk mengelola state form dan tindakan server
  const [state, formAction] = useFormState(resetPassword, initialFormState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Ambil token dari parameter URL
  const { token } = params;

  // Efek untuk menampilkan pesan sukses jika tidak ada error
  useEffect(() => {
    if (state.error === "" && state.error !== initialFormState.error) {
      setShowSuccessMessage(true);
    } else {
      setShowSuccessMessage(false);
    }
  }, [state]);

  return (
    <div
      id="reset-password"
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
          <h1 className="font-bold text-2xl leading-[34px] text-center">Reset Your Password</h1>
          <p className="text-sm text-[#616369] text-center">
            Enter your new password below.
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
              <p className="text-sm">Kata sandi Anda berhasil direset. Anda sekarang dapat masuk dengan kata sandi baru Anda.</p>
              <Link href="/sign-in" className="text-blue-600 hover:underline mt-2 block text-center">
                Go to Sign In
              </Link>
            </div>
          )}

          {/* Input tersembunyi untuk token */}
          <input type="hidden" name="token" value={token} />
          
          {/* Input field untuk kata sandi baru */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  src="/assets/icons/lock.svg" // Pastikan path icon ini benar
                  alt="password icon"
                  width={20}
                  height={20}
                  priority
                  className="w-auto h-5"
                />
              </div>
              <input
                type={revealPassword ? "text" : "password"}
                id="password"
                name="password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black bg-transparent"
                placeholder="New password"
                required
              />
              <button
                type="button"
                className="reveal-password flex shrink-0 text-[#616369] hover:text-black"
                onClick={() => setRevealPassword(!revealPassword)}
              >
                {revealPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Input field untuk konfirmasi kata sandi baru */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  src="/assets/icons/lock.svg" // Pastikan path icon ini benar
                  alt="confirm password icon"
                  width={20}
                  height={20}
                  priority
                  className="w-auto h-5"
                />
              </div>
              <input
                type={revealConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black bg-transparent"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                className="reveal-password flex shrink-0 text-[#616369] hover:text-black"
                onClick={() => setRevealConfirmPassword(!revealConfirmPassword)}
              >
                {revealConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Tombol submit */}
          <div className="flex flex-col gap-3">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
