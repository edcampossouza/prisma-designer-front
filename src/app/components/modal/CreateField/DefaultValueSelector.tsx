import { BooleanType, DataType, DateTimeType, IntType } from "prismadesign-lib";
import { useState } from "react";

type Props = {
  type: DataType;
  value?: string;
  setValue: (value: string) => void;
};

const defaultOptions = new Map<DataType, string[]>([
  [IntType, ["autoincrement()"]],
  [DateTimeType, ["now()"]],
  [BooleanType, ["true", "false"]],
]);

export default function DefaultValueSelector(props: Props) {
  const { type } = props;
  const { value, setValue } = props;
  const options = defaultOptions.get(type);
  const [customValue, setCustomValue] = useState(false);

  return (
    <div className="font-mono text-sm flex flex-col pl-4">
      <h3 className="font-sans text-base">Default value</h3>
      {options ? (
        <>
          {options.map((op) => (
            <label
              key={op}
              className="flex items-center hover:cursor-pointer text-sm hover:bg-btn-bg-hov"
            >
              <input
                type="radio"
                name="value"
                checked={value === op && !customValue}
                onChange={(e) => {
                  setCustomValue(false);
                  setValue(op);
                }}
              />
              {op}
            </label>
          ))}
          <label className="flex items-center hover:cursor-pointer text-sm hover:bg-btn-bg-hov">
            <input
              type="radio"
              name="value"
              onChange={(e) => setCustomValue(e.target.checked)}
            />
            custom:
            <input
              type="text"
              className="text-field-color bg-btn-bg"
              disabled={!customValue}
              value={customValue ? value : ""}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </>
      ) : (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </>
      )}
    </div>
  );
}
