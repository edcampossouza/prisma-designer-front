"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/context/user.context";
import { UserInfo, clearToken } from "@/app/util/auth";
import SignInComponent from "@/app/sign-in/SignInComponent";
import SignUpComponent from "@/app/sign-up/SignUpComponent";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
      <div className="bg-code-bd text-text-main p-2">
        <h3 className="text-center">Signed in as:</h3>
        <h3 className="text-center">{user.email}</h3>
        <div className="flex justify-end">
          <button className="bg-btn-bg hover:bg-btn-bg-hov p-2 rounded-md" onClick={logout}>Logout</button>
        </div>
      </div>
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
      className={`fixed inset-0  w-80 h-fit mx-auto my-20 flex flex-col bg-gray-100 rounded-lg border-2 border-black z-50 ${
        props.hidden && "invisible"
      }`}
    >
      <div className="relative">
        <AiOutlineCloseCircle
          className="absolute text-text-main text-2xl right-3 top-1 hover:cursor-pointer"
          onClick={() => props.close()}
        />
        {component}
      </div>
    </div>
  );
}
