"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const signUpPath: string = `/sign-up`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUp path={signUpPath} />
    </div>
  );
}
