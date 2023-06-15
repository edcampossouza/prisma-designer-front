import { Field } from "prismadesign-lib";

export default function DataField(props: { field: Field; xarrow_id?: string }) {
  return (
    <tr className="text-sm" id={props.xarrow_id}>
      <td>{props.field.name}</td>
      <td>{props.field.type.name}</td>
      <td>{attributesToString(props.field)}</td>
    </tr>
  );
}

function attributesToString(field: Field): string {
  return field.attributes
    .map((att) => {
      return `@${att.name}`;
    })
    .join(" ");
}
