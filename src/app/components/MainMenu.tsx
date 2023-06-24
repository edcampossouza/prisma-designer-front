"use client";
import {
  AiFillPlusCircle,
  AiOutlineSend,
  AiOutlineUser,
  AiFillSave,
  AiFillCheckSquare,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { SiPrisma } from "react-icons/si";
import { Model } from "prismadesign-lib";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user.context";

type Props = {
  createEntity: Function;
  createField: Function;
  toggleUserWindow: Function;
  toggleSaveWindow: Function;
  setTyping: (typing: boolean) => void;
  schemaName: string;
  setSchemaName: (name: string) => void;
  selectedModel: Model | null;
  generateSchema: Function;
};
export default function MainMenu(props: Props) {
  const { user } = useContext(UserContext);
  const [newSchemaName, setNewSchemaName] = useState(props.schemaName);

  const content = (
    <>
      <div className="w-full px-4 flex ">
        Schema Name:{" "}
        <input
          className="font-mono"
          value={newSchemaName}
          onChange={(e) => setNewSchemaName(e.target.value)}
          onFocus={() => {
            props.setTyping(true);
          }}
          onBlur={() => props.setTyping(false)}
        />
        <button
          onClick={() => {
            props.setSchemaName(newSchemaName);
          }}
          disabled={newSchemaName === props.schemaName}
          className="hover:cursor-pointer disabled:text-gray-700 text-green-500"
        >
          <AiFillCheckSquare className="w-8 h-8 rounded-xl" />
        </button>
        <button
          onClick={() => {
            setNewSchemaName(props.schemaName);
          }}
          className="hover:cursor-pointer   text-red-500"
        >
          <AiFillCloseCircle className="w-8 h-8 rounded-xl" />
        </button>
      </div>
    </>
  );
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
          <div
            className=" flex flex-col items-center hover:cursor-pointer"
            onClick={() => props.toggleUserWindow()}
          >
            <AiOutlineUser className="bg-green-400 rounded-md text-white text-lg  w-12" />
            <span className="text-center">
              {user ? <span>{user.email}</span> : "sign in"}
            </span>
          </div>
          <div className="  flex flex-col items-center">
            <AiFillSave
              onClick={() => props.toggleSaveWindow()}
              className="bg-green-400 rounded-md text-white text-lg hover:cursor-pointer w-12"
            />
            <span className="text-center">
              {user ? "Save" : "You need to be logged in to save your work"}
            </span>
          </div>
        </div>
      </menu>
    </header>
  );
}
