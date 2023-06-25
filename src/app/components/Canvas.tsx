"use client";
import { useContext, useState } from "react";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import DataModel from "./prisma-objects/DataModel";
import { UserContext } from "@/context/user.context";
import { Schema, Model, Field } from "prismadesign-lib";
import { GraphicContext } from "@/context/graphic.context";

type Props = {
  schema: Schema;
  onDragModel: (model: Model) => void;
};
export default function Canvas(props: Props) {
  const { schema } = props;
  const { notifyError } = useContext(UserContext);
  const { x_bound, y_bound } = useContext(GraphicContext);

  console.log(x_bound, y_bound);
  const update = useXarrow();
  return (
    <Xwrapper>
      <main
        className={`bg-btn-bg w-screen h-screen overflow-auto`}
        style={{
          minWidth: `${x_bound + 500}px`,
          minHeight: `${y_bound + 500}px`,
        }}
      >
        {schema.models.map((model) => (
          <DataModel
            key={`${schema.name}##${model.name}`}
            model={model}
            onDragModel={props.onDragModel}
            onDelete={() => {
              try {
                schema.deleteModel(model);
              } catch (error) {
                notifyError(error);
              }
              update();
            }}
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
      </main>
    </Xwrapper>
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
