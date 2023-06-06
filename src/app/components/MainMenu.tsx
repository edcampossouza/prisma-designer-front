"use client";
import IconButton from "./buttons/IconButton";
import { AiFillPlusCircle } from "react-icons/ai";
import { Model } from "prismadesign-lib";

type Props = {
  createEntity: Function;
  createField: Function;
  selectedModel: Model | null;
};
export default function MainMenu(props: Props) {
  return (
    <menu className="w-full h-16 bg-orange-300">
      <IconButton onClick={props.createEntity}>
        <AiFillPlusCircle />
      </IconButton>
      <AiFillPlusCircle
        onClick={() => props.createField()}
        className="bg-red-400 rounded-md text-white text-lg hover:cursor-pointer w-12"
      />
    </menu>
  );
}
