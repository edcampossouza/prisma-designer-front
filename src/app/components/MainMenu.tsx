"use client";
import { AiFillPlusCircle, AiOutlineSend } from "react-icons/ai";
import { Model } from "prismadesign-lib";
import { useContext } from "react";
import { UserContext } from "@/context/user.context";

type Props = {
  createEntity: Function;
  createField: Function;
  selectedModel: Model | null;
  generateSchema: Function;
};
export default function MainMenu(props: Props) {
  const { user } = useContext(UserContext);
  return (
    <menu className="w-full h-16 bg-orange-300 flex justify-around items-center">
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
      {user ? <>{user.email}</> : "Not logged in"}
    </menu>
  );
}
