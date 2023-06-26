"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SignInComponent from "./SignInComponent";
import { SiPrisma } from "react-icons/si";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();

  function onSignUpLink() {
    router.push("/sign-up");
  }

  function onSuccess() {
    router.push("/");
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-btn-bg">
      <Link href={"/"}>
        <div className="bg-code-bd text-text-main h-12 flex items-center justify-center space-x-2 hover:cursor-pointer">
          <SiPrisma />
          <span>Prisma Designer</span>
        </div>
      </Link>
      <SignInComponent
        onFailure={() => {}}
        onSuccess={onSuccess}
        onSignUpLink={onSignUpLink}
      />
      ;
    </div>
  );
}
