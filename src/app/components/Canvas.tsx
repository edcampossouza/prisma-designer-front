"use client";
import { useContext } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import DataModel from "./prisma-objects/DataModel";
import { UserContext } from "@/context/user.context";
import { Schema, Model, Field } from "prismadesign-lib";

type Props = {
  schema: Schema;
  onDragModel: (model: Model) => void;
};
export default function Canvas(props: Props) {
  const { schema } = props;
  const { notifyError } = useContext(UserContext);
  const update = useXarrow();
  return (
    <main>
      <Xwrapper>
        {schema.models.map((model) => (
          <DataModel
            key={`${schema.name}##${model.name}`}
            model={model}
            onDragModel={props.onDragModel}
            onDeleteField={(field) => {
              try {
                field.model.removeField(field);
              } catch (error) {
                notifyError(error);
              }
              update();
            }}
          />
        ))}
        {/* <DataModel fields={[]} name={model.name} /> */}
        <ArrowsComponent models={schema.models} prefix={schema.name} />
      </Xwrapper>
    </main>
  );
}

function ArrowsComponent(props: { models: Model[]; prefix: string }) {
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
              key={`${props.prefix}#${start}#${end}`}
              start={start}
              end={end}
              divContainerStyle={{ zIndex: 1000000, opacity: 0.5 }}
            />
          );
        })}
    </>
  );
}
