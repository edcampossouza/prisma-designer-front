import * as React from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useXarrow } from "react-xarrows";
import DataField from "./DataField";

import { Model } from "prismadesign-lib";
import { GrModel } from "../App";

type Props = {
  model: GrModel;
  onDragModel: (model: Model) => void;
};

export default function DataModel(props: Props) {
  const { fields, name, selected } = props.model;

  const updateArrows = useXarrow();
  return (
    <Draggable
      defaultPosition={{ x: 200, y: 10 }}
      onStop={(_event: DraggableEvent, data: DraggableData) => {
        console.log(props.model.name);
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
        <div className="text-lg w-full border-b-2 border-black">{name}</div>
        <table className="w-full">
          <tbody className="w-full">
            {fields.map((field) => (
              <DataField
                key={field.name}
                field={field}
                xarrow_id={`${name}#${field.name}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Draggable>
  );
}
