"use client";
import IconButton from "./buttons/IconButton";
import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
  createEntity: Function;
};
export default function MainMenu(props: Props) {
  return (
    <menu className="w-full h-16 bg-orange-300">
      <IconButton onClick={props.createEntity}>
        <AiFillPlusCircle />
      </IconButton>
    </menu>
  );
}
