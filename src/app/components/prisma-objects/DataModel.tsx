import * as React from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useXarrow } from "react-xarrows";
import DataField from "./DataField";

import { Model } from "prismadesign-lib";

type Props = {
  model: Model;
  onDragModel: (model: Model) => void;
};

export default function DataModel(props: Props) {
  const { fields, name } = props.model;
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
      <div className="flex w-20 flex-col items-center bg-slate-200 cursor-move">
        <div className="text-lg w-full">{name}</div>
        <div className="w-full">
          {fields.map((field) => (
            <DataField
              key={field.name}
              field={field}
              xarrow_id={`${name}#${field}`}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}
