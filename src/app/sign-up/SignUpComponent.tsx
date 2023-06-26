import { useState } from "react";
import axios from "axios";
import { signUp } from "../services/auth";
import { FiAlertTriangle } from "react-icons/fi";

type Props = {
  onSuccess: Function;
  onFailure: Function;
  onSignInLink: Function;
};

export default function SignUpComponent(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setInfoMessage("");
    if (password !== confirmPassword) {
      setInfoMessage("Passwords do not match");
      setTimeout(() => {
        setInfoMessage("");
      }, 3000);
      return;
    } else {
      try {
        await signUp(email, password);
        props.onSuccess();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setInfoMessage(error.response?.data?.message || error.message);
        }
      }
      props.onFailure();
    }
  }

  return (
    <div className="w-full p-6 m-auto bg-code-bd rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl text-text-main">
      <h1 className="text-3xl font-semibold text-center uppercase">
        Sign Up
      </h1>
      <form className="mt-6" onSubmit={submit}>
        <div className="mb-2">
          <label className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mt-2 bg-btn-bg border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 bg-btn-bg border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 bg-btn-bg border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        {infoMessage && (
          <div className="mb-2">
           <div className="flex items-center space-x-1 w-full px-4 py-2 mt-2 bg-btn-bg rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
              <FiAlertTriangle />
              <span>{infoMessage}</span>
            </div>
          </div>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-confirm rounded-md hover:bg-confirm-hov focus:outline-none focus:shadow-sm shadow-confirm"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-8 text-xs font-light text-center ">
        Already have an account?{" "}
        <span
          onClick={() => props.onSignInLink()}
          className="font-medium text-confirm hover:underline hover:cursor-pointer"
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
