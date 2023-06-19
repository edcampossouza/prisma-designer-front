"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SignInComponent from "./SignInComponent";

export default function SignUp() {
  const router = useRouter();

  function onSignUpLink() {
    router.push("/sign-up");
  }

  function onSuccess() {
    router.push("/");
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <SignInComponent
        onFailure={() => {}}
        onSuccess={onSuccess}
        onSignUpLink={onSignUpLink}
      />
      ;
    </div>
  );
}
