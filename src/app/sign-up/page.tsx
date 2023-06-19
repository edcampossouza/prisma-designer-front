"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signUp } from "../services/auth";
import SignUpComponent from "./SignUpComponent";

export default function SignUp() {
  const router = useRouter();
  function goToSignIn() {
    router.push("/sign-in");
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <SignUpComponent
        onSuccess={goToSignIn}
        onFailure={() => {}}
        onSignInLink={goToSignIn}
      />
    </div>
  );
}
