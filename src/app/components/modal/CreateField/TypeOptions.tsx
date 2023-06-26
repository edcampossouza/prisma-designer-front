import { useEffect, useState } from "react";

import {
  BooleanType,
  DataType,
  DateTimeType,
  FieldAttribute,
  IntType,
  DecimalType,
  Model,
  Schema,
  StringType,
} from "prismadesign-lib";

import { IdFieldAttribute } from "prismadesign-lib";

type ReferenceOptions = {
  references: Model;
};

type Props = {
  selectDataType: (type: DataType) => void;
  setReferences: (reference: ReferenceOptions) => void;
  setAttributes: (attrs: FieldAttribute[]) => void;
  isReference: boolean;
  setIsReference: (val: boolean) => void;
  referencedModel?: Model;
  attributes: FieldAttribute[];
  schema: Schema;
};

export default function TypeOptions(props: Props) {
  const options: DataType[] = [
    BooleanType,
    DateTimeType,
    IntType,
    StringType,
    DecimalType,
  ];

  const [possibleAttributes, setPossibleAttributes] = useState<
    FieldAttribute[]
  >([]);

  const [selectedType, setSelectedType] = useState<DataType>();
  const { isReference: isForeignKey, setIsReference: setIsForeignKey } = props;

  useEffect(() => {
    if (selectedType) {
      if (isForeignKey) {
        setPossibleAttributes(
          selectedType.possibleAttributes.filter((a) => a !== IdFieldAttribute)
        );
      } else {
        setPossibleAttributes(selectedType.possibleAttributes);
      }
    }
  }, [selectedType, isForeignKey]);

  return (
    <div className="w-full pl-4">
      <h2>Field Type</h2>
      <div className="border-b mb-2 py-2">
        {options.map((type) => (
          <label
            key={type.name}
            className={`flex items-center hover:cursor-pointer text-sm hover:bg-btn-bg-hov`}
          >
            <input
              type="radio"
              name="datatype"
              className="w-5 h-5 mr-2"
              value={type.name}
              onChange={() => {
                props.selectDataType(type);
                setPossibleAttributes(type.possibleAttributes);
                setIsForeignKey(false);
                setSelectedType(type);
              }}
            />
            <span className="text">{type.name}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col border-b mb-2 pb-2">
        <h3>Attributes</h3>
        <div className="flex space-x-4 ">
          {possibleAttributes.map((attribute) => (
            <label key={attribute.name} className="flex items-center text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
                checked={
                  props.attributes.find((a) => a === attribute) !== undefined
                }
                onChange={() => {
                  const f = props.attributes.find((a) => a === attribute);
                  if (f)
                    props.setAttributes(
                      props.attributes.filter((at) => at !== attribute)
                    );
                  else {
                    props.setAttributes([...props.attributes, attribute]);
                  }
                }}
              />
              {attribute.name}
            </label>
          ))}
        </div>
      </div>

      <h3>Key Options</h3>
      <div className="flex items-center mb-2">
        <div
          className={`flex items-center w-full ${!isForeignKey && "border-b"}`}
        >
          <span className={`text-sm`}>Foreign Key?</span>
          <input
            type="checkbox"
            className="w-4 h-4 ml-2"
            checked={isForeignKey}
            onChange={(e) => {
              const { checked } = e.target;
              setIsForeignKey(checked);
            }}
          />
        </div>
      </div>
      {isForeignKey && (
        <div className="flex flex-col">
          <h2>References:</h2>
          <div className="border-b mb-2 pb-2">
            {props.schema.models.map((model) => (
              <label
                key={model.name}
                className="flex items-center hover:cursor-pointer text-sm hover:bg-btn-bg-hov"
              >
                <input
                  type="radio"
                  name="references"
                  className="w-5 h-5 mr-2"
                  checked={props.referencedModel === model}
                  onChange={() => {
                    props.setReferences({ references: model });
                  }}
                />
                <span>{model.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
