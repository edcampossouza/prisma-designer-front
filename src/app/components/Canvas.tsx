"use client";
import Xarrow, { Xwrapper } from "react-xarrows";
import DataModel from "./prisma-objects/DataModel";
import { Schema, Model } from "prismadesign-lib";
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
      </Xwrapper>
    </main>
  );
}
