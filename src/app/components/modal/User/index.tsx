"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/context/user.context";
import { UserInfo, clearToken } from "@/app/util/auth";
import SignInComponent from "@/app/sign-in/SignInComponent";
import SignUpComponent from "@/app/sign-up/SignUpComponent";

type Props = {
  hidden: boolean;
  close: Function;
};

export default function User(props: Props) {
  const { user, setUser } = useContext(UserContext);
  const [authStatus, setAuthStatus] = useState<"sign-up" | "sign-in">(
    "sign-in"
  );

  function logout() {
    setUser(undefined);
    clearToken();
    props.close();
  }

  function login(uInfo: UserInfo) {
    setUser(uInfo);
    props.close();
  }

  let component;
  if (user) {
    component = (
      <h3>
        {user.email} logged in
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </h3>
    );
  } else {
    component =
      authStatus === "sign-in" ? (
        <SignInComponent
          onFailure={() => {}}
          onSuccess={login}
          onSignUpLink={() => {
            setAuthStatus("sign-up");
          }}
        />
      ) : (
        <SignUpComponent
          onFailure={() => {}}
          onSuccess={() => setAuthStatus("sign-in")}
          onSignInLink={() => setAuthStatus("sign-in")}
        />
      );
  }
  return (
    <div
      className={`fixed inset-0  w-80 h-fit mx-auto my-16 flex flex-col bg-gray-100 rounded-lg border-2 border-black ${
        props.hidden && "invisible"
      }`}
    >
      {component}
    </div>
  );
}