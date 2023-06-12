"use client";
import Xarrow, { Xwrapper } from "react-xarrows";
import DataModel from "./prisma-objects/DataModel";
import { Schema, Model, Field } from "prismadesign-lib";

type Props = {
  schema: Schema;
  onDragModel: (model: Model) => void;
};
export default function Canvas(props: Props) {
  const { schema } = props;
  return (
    <main>
      <Xwrapper>
        {schema.models.map((model) => (
          <DataModel
            key={model.name}
            model={model}
            onDragModel={props.onDragModel}
          />
        ))}
        {/* <DataModel fields={[]} name={model.name} /> */}
        <ArrowsComponent models={schema.models} />
      </Xwrapper>
    </main>
  );
}

function ArrowsComponent(props: { models: Model[] }) {
  return (
    <>
      {props.models
        .reduce<Field[]>((p, c) => [...p, ...c.fields], [])
        .filter((field) => field.references !== undefined)
        .map((field) => {
          const start = `${field.model.name}#${field.name}`;
          const end = `${field.references?.referenced.model.name}#${field.references?.referenced.name}`;
          return (
            <Xarrow
              key={`${start}##${end}`}
              start={start}
              end={end}
              divContainerStyle={{ zIndex: 1000000, opacity: 0.5 }}
            />
          );
        })}
    </>
  );
}
