import { useContext } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useXarrow } from "react-xarrows";
import { AiFillDelete } from "react-icons/ai";

import DataField from "./DataField";
import { GraphicContext } from "@/context/graphic.context";

import { Field, Model } from "prismadesign-lib";
import { GrModel } from "../App";

type Props = {
  model: GrModel;
  onDragModel: (model: Model) => void;
  onDelete: Function;
  onDeleteField: (field: Field) => void;
};

export default function DataModel(props: Props) {
  const { fields, name, selected } = props.model;
  const { positions, addPosition } = useContext(GraphicContext);
  const defaultPos = positions[props.model.name] || { x: 10, y: 10 };
  const updateArrows = useXarrow();
  return (
    <Draggable
      defaultPosition={defaultPos}
      onStop={(_event: DraggableEvent, data: DraggableData) => {
        addPosition(props.model.name, { x: data.x, y: data.y });
        props.onDragModel(props.model);
        updateArrows();
      }}
      onDrag={(event: DraggableEvent, data: DraggableData) => {
        updateArrows();
      }}
    >
      <div
        className={`flex flex-col w-fit min-w-[150px] items-center ${
          selected ? "border-black border-2" : ""
        }  bg-slate-200 cursor-move rounded p-2 `}
      >
        <div className="text-lg w-full border-b-2 border-black flex justify-between items-center hover:cursor-pointer">
          {name}
          <AiFillDelete
            className="text-red-500 text-2xl"
            onClick={() => props.onDelete()}
          />
        </div>
        <table className="w-full">
          <tbody className="w-full">
            {fields.map((field) => (
              <DataField
                key={field.name}
                field={field}
                xarrow_id={`${name}#${field.name}`}
                onDelete={() => props.onDeleteField(field)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Draggable>
  );
}
