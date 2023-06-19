import { useEffect, useState } from "react";

import {
  BooleanType,
  DataType,
  DateTimeType,
  FieldAttribute,
  IntType,
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
  const options: DataType[] = [BooleanType, DateTimeType, IntType, StringType];

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
    <>
      {options.map((type) => (
        <label key={type.name}>
          <input
            type="radio"
            name="datatype"
            value={type.name}
            onChange={() => {
              props.selectDataType(type);
              setPossibleAttributes(type.possibleAttributes);
              setIsForeignKey(false);
              setSelectedType(type);
            }}
          />
          {type.name}
        </label>
      ))}

      {
        <>
          <label>
            Foreign Key?
            <input
              type="checkbox"
              checked={isForeignKey}
              onChange={(e) => {
                const { checked } = e.target;
                setIsForeignKey(checked);
              }}
            />
          </label>
          <label>
            Attributes
            <div>
              {possibleAttributes.map((attribute) => (
                <label key={attribute.name}>
                  <input
                    type="checkbox"
                    checked={
                      props.attributes.find((a) => a === attribute) !==
                      undefined
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
          </label>
        </>
      }

      {isForeignKey && (
        <div className="flex flex-col">
          <h3>Key Options</h3>
          {props.schema.models.map((model) => (
            <label key={model.name}>
              {model.name}
              <input
                type="radio"
                name="references"
                checked={props.referencedModel === model}
                onChange={() => {
                  props.setReferences({ references: model });
                }}
              />
            </label>
          ))}
        </div>
      )}
    </>
  );
}
