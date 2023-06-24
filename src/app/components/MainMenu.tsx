"use client";
import {
  AiOutlineSend,
  AiOutlineSave,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { SiPrisma } from "react-icons/si";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { Model } from "prismadesign-lib";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user.context";

type Props = {
  createEntity: Function;
  createField: Function;
  toggleUserWindow: Function;
  toggleSaveWindow: Function;
  schemaName: string;
  setSchemaName: (name: string) => void;
  selectedModel: Model | null;
  generateSchema: Function;
};
export default function MainMenu(props: Props) {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-code-bd flex justify-between text-text-main">
      <nav className="flex items-center justify-between p-2 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <SiPrisma className="text-2xl" />
            <span className="hidden sm:block">Prisma Designer</span>
          </a>
        </div>
      </nav>
      <menu className="flex items-center justify-between p-2 lg:px-8 ">
        <div className="w-full h-full flex justify-around items-center space-x-1">
          <div
            className="flex flex-col items-center bg-btn-bg text-model-color hover:cursor-pointer hover:bg-btn-bg-hov rounded-md w-16"
            onClick={() => props.createEntity()}
          >
            [M]odel
            <AiOutlinePlusCircle className=" text-white text-lg  " />
          </div>
          <div
            className="flex flex-col items-center bg-btn-bg text-field-color hover:cursor-pointer hover:bg-btn-bg-hov rounded-md w-16"
            onClick={() => props.createField()}
          >
            [F]ield
            <AiOutlinePlusCircle className=" text-white text-lg" />
          </div>
          <div
            className="flex flex-col items-center bg-btn-bg text-text-main hover:cursor-pointer hover:bg-btn-bg-hov rounded-md w-16"
            onClick={() => props.generateSchema()}
          >
            Generate
            <AiOutlineSend className="text-white text-lg " />
          </div>
          {user && (
            <div
              className="flex flex-col items-center bg-btn-bg text-text-main hover:cursor-pointer hover:bg-btn-bg-hov rounded-md w-18"
              onClick={() => props.toggleSaveWindow()}
            >
              Load/Save
              <AiOutlineSave className="text-white text-lg " />
            </div>
          )}
          <div
            className={`flex flex-col items-center text-text-main hover:cursor-pointer rounded-md w-16 ${
              user
                ? "bg-confirm hover:bg-confirm-hov"
                : "bg-btn-bg hover:bg-btn-bg-hov"
            }`}
            onClick={() => props.toggleUserWindow()}
          >
            {user ? (
              <>
                <span className="text-center">Profile</span>
                <FiUserCheck className="text-white text-lg" />
              </>
            ) : (
              <>
                <span className="text-center">sign in</span>
                <FiUserPlus className="text-white text-lg" />
              </>
            )}
          </div>
        </div>
      </menu>
    </header>
  );
}
