import {
  BooleanType,
  DataType,
  DateTimeType,
  IntType,
  StringType,
} from "prismadesign-lib";

type Props = {
  selectDataType: (type: DataType) => void;
};

const options = [BooleanType, DateTimeType, IntType, StringType];
export default function (props: Props) {
  return (
    <>
      {options.map((type) => (
        <label key={type.name}>
          <input
            type="radio"
            name="datatype"
            value={type.name}
            onChange={() => {
              props.selectDataType(type);
            }}
          />
          {type.name}
        </label>
      ))}
    </>
  );
}
