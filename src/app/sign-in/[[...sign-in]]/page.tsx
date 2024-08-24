"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const signInPath: string = `/sign-in`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn path={signInPath} />
    </div>
  );
}
