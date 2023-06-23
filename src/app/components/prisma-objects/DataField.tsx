import { Field } from "prismadesign-lib";
import { AiFillDelete } from "react-icons/ai";

export default function DataField(props: {
  field: Field;
  xarrow_id?: string;
  onDelete: Function;
}) {
  return (
    <tr className="text-sm font-mono" id={props.xarrow_id}>
      <td className="pr-1">{props.field.name}</td>
      <td className="px-1">{props.field.type.name}</td>
      <td className="pl-1">{attributesToString(props.field)}</td>
      <td>
        <AiFillDelete
          className="text-red-500 text-lg hover:cursor-pointer"
          onClick={() => {
            props.onDelete();
          }}
        />
      </td>
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
