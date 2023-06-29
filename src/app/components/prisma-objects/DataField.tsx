import { Field, OptionalFieldAttribute } from "prismadesign-lib";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function DataField(props: {
  field: Field;
  xarrow_id?: string;
  onDelete: Function;
}) {
  return (
    <tr className="text-sm font-mono" id={props.xarrow_id}>
      <td className="pr-1 text-field-color">{props.field.name}</td>
      <td className="px-1 text-type-color">
        {props.field.type.name}
        {props.field.attributes.includes(OptionalFieldAttribute) && "?"}
      </td>
      <td className="pl-1 text-attribute-color">
        {attributesToString(props.field)}
      </td>
      <td>
        <AiOutlineCloseCircle
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
      if (att.name === "optional") return;
      if (att.name !== "default") return `@${att.name}`;
      else return `@${att.name}(${field.defaultValue})`;
    })
    .join(" ");
}
