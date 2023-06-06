import * as React from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useXarrow } from "react-xarrows";
import DataField from "./DataField";

import { Field } from "prismadesign-lib";

export default function DataModel(props: { name: string; fields: Field[] }) {
  const updateArrows = useXarrow();
  return (
    <Draggable
      defaultPosition={{ x: 200, y: 10 }}
      onStop={(_event: DraggableEvent, data: DraggableData) => {
        console.log(data.x, data.y);
        updateArrows();
      }}
      onDrag={(event: DraggableEvent, data: DraggableData) => {
        updateArrows();
      }}
    >
      <div className="flex w-20 flex-col items-center bg-slate-200 cursor-move">
        <div className="text-lg w-full">{props.name}</div>
        <div className="w-full">
          {props.fields.map((field) => (
            <DataField
              key={field.name}
              field={field}
              xarrow_id={`${props.name}#${field}`}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}
