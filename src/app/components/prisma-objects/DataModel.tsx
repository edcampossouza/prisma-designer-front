import * as React from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";
import DataField from "./DataField";

export default function DataModel(props: { name: string; fields: string[] }) {
  const updateArrows = useXarrow();
  return (
    <Draggable onStop={updateArrows} onDrag={updateArrows}>
      <div className=" flex w-20 flex-col items-center bg-slate-200">
        <div className="text-lg">{props.name}</div>
        <div>
          {props.fields.map((field) => (
            <DataField
              key={field}
              name={field}
              xarrow_id={`${props.name}#${field}`}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}
