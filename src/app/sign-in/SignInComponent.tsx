import React, { useState } from "react";
import axios from "axios";
import { signIn } from "../services/auth";
import { UserInfo, storeUserInfo } from "../util/auth";

type Props = {
  onSuccess: (uInfo: UserInfo) => void;
  onFailure: Function;
  onSignUpLink: Function;
};

export default function SignInComponent(props: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState("");

  async function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInfoMessage("");
    try {
      const response = await signIn(email, password);
      storeUserInfo(response.data);
      props.onSuccess(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setInfoMessage(error.response?.data?.message || error.message);
      }
      props.onFailure();
    }
  }
  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl">
      <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
        Sign in
      </h1>
      <form className="mt-6" onSubmit={onFormSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-800">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        {infoMessage && (
          <div className="mb-2">
            <span className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
              {infoMessage}
            </span>
          </div>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Login
          </button>
        </div>
      </form>

      <p className="mt-8 text-xs font-light text-center text-gray-700">
        Don&apos;t have an account yet?
        <span
          onClick={() => props.onSignUpLink()}
          className="font-medium text-purple-600 hover:underline hover:cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
