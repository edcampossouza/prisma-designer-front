import { Field } from "prismadesign-lib";

export default function DataField(props: { field: Field; xarrow_id?: string }) {
  return (
    <tr className="text-sm font-mono" id={props.xarrow_id}>
      <td className="pr-1">{props.field.name}</td>
      <td className="px-1">{props.field.type.name}</td>
      <td className="pl-1">{attributesToString(props.field)}</td>
    </tr>
  );
}

function attributesToString(field: Field): string {
  return field.attributes
    .map((att) => {
      if (att.name !== "default") return `@${att.name}`;
      else return `@${att.name}(${field.defaultValue})`;
    })
    .join(" ");
}
