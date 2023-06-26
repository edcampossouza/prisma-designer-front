"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SignUpComponent from "./SignUpComponent";
import Link from "next/link";
import { SiPrisma } from "react-icons/si";

export default function SignUp() {
  const router = useRouter();
  function goToSignIn() {
    router.push("/sign-in");
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-btn-bg">
      <Link href={"/"}>
        <div className="bg-code-bd text-text-main h-12 flex items-center justify-center space-x-2 hover:cursor-pointer">
          <SiPrisma />
          <span>Prisma Designer</span>
        </div>
      </Link>
      <SignUpComponent
        onSuccess={goToSignIn}
        onFailure={() => {}}
        onSignInLink={goToSignIn}
      />
    </div>
  );
}
