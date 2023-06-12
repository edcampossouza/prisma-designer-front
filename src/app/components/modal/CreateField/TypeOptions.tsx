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
  schema: Schema;
};

export default function (props: Props) {
  const options: DataType[] = [BooleanType, DateTimeType, IntType, StringType];

  const [attributes, setAttributes] = useState<FieldAttribute[]>([]);
  const [selectedType, setSelectedType] = useState<DataType>();
  const [isForeignKey, setIsForeignKey] = useState(false);
  const [referencesModel, setReferencesModel] = useState<Model>();

  useEffect(() => {
    if (selectedType) {
      if (isForeignKey) {
        setAttributes(
          selectedType.possibleAttributes.filter((a) => a !== IdFieldAttribute)
        );
      } else {
        setAttributes(selectedType.possibleAttributes);
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
              setAttributes(type.possibleAttributes);
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
          {attributes.map((attribute) => (
            <label key={attribute.name}>
              <input type="checkbox" />
              {attribute.name}
            </label>
          ))}
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
                checked={referencesModel === model}
                onChange={() => {
                  props.setReferences({ references: model });
                  setReferencesModel(model);
                }}
              />
            </label>
          ))}
        </div>
      )}
    </>
  );
}
