import { Field } from "prismadesign-lib";

export default function DataField(props: { field: Field; xarrow_id?: string }) {
  return (
    <div className="text-sm w-full" id={props.xarrow_id}>
      {props.field.name}: {props.field.type.name}
    </div>
  );
}
