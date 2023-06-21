"use client";
import {
  AiFillPlusCircle,
  AiOutlineSend,
  AiOutlineUser,
  AiFillSave,
  AiFillCheckSquare,
  AiFillCloseCircle,
} from "react-icons/ai";
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
  return (
    <menu className="w-full h-18 bg-orange-300 ">
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
      <div className="w-full h-full flex justify-around items-center">
        <div className="  flex flex-col items-center">
          Create [M]odel
          <AiFillPlusCircle
            onClick={() => props.createEntity()}
            className="bg-blue-400 rounded-md text-white text-lg hover:cursor-pointer w-12"
          />
        </div>
        <div className="  flex flex-col items-center">
          Create [F]ield
          <AiFillPlusCircle
            onClick={() => props.createField()}
            className="bg-red-400 rounded-md text-white text-lg hover:cursor-pointer w-12"
          />
        </div>
        <div className="  flex flex-col items-center">
          Generate
          <AiOutlineSend
            onClick={() => props.generateSchema()}
            className="bg-green-400 rounded-md text-white text-lg hover:cursor-pointer w-12"
          />
        </div>
        <div
          className=" flex flex-col items-center hover:cursor-pointer"
          onClick={() => props.toggleUserWindow()}
        >
          <AiOutlineUser className="bg-green-400 rounded-md text-white text-lg  w-12" />
          <span className="text-center">
            {user ? <>{user.email}</> : "sign in"}
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
  );
}
