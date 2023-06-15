"use client";

import React, { useState, useRef, useEffect } from "react";
import TypeOptions from "./TypeOptions";
import DefaultValueSelector from "./DefaultValueSelector";
import {
  DataType,
  Schema,
  FieldAttribute,
  DefaultFieldAttribute,
} from "prismadesign-lib";
import { ReferenceOptions } from "../../App";

type Props = {
  hidden: boolean;
  submit: (
    name: string,
    type: DataType,
    fieldAttributes: FieldAttribute[],
    defaultValue?: string,
    references?: ReferenceOptions
  ) => void;
  schema: Schema;
};

export default function CreateField(props: Props) {
  const [type, setType] = useState<DataType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [attributes, setAttributes] = useState<FieldAttribute[]>([]);
  const [referenceOptions, setReferenceOptions] = useState<ReferenceOptions>();
  const [defalutValue, setDefaultValue] = useState<string>();
  const [isReference, setIsReference] = useState(false);

  const [name, setName] = useState("");
  function submit() {
    if (props.submit && type !== null) {
      let _defaultValue = attributes.includes(DefaultFieldAttribute)
        ? defalutValue
        : undefined;
      props.submit(name, type, attributes, _defaultValue, referenceOptions);
      setName("");
      setAttributes([]);
      setReferenceOptions(undefined);
      setIsReference(false);
    }
  }

  function setFieldType(type: DataType) {
    setType(type);
    setDefaultValue("");
  }

  function setReferenceOptionsFn(referenceOptions: ReferenceOptions) {
    console.log(`setting to ${referenceOptions.references.name}`);
    setReferenceOptions(referenceOptions);
  }
  useEffect(() => {
    if (!props.hidden) {
      inputRef.current?.focus();
    }
  }, [props.hidden]);

  return (
    <div
      className={`fixed inset-0  w-fit h-fit mx-auto my-16 flex flex-col bg-gray-100 rounded-lg border-2 border-black ${
        props.hidden && "invisible"
      }`}
    >
      Field name
      <input
        ref={inputRef}
        className="text-lg bg-slate-200"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            submit();
          }
        }}
      />
      <TypeOptions
        selectDataType={setFieldType}
        setReferences={setReferenceOptionsFn}
        setAttributes={setAttributes}
        isReference={isReference}
        setIsReference={setIsReference}
        attributes={attributes}
        schema={props.schema}
      />
      {type && attributes.includes(DefaultFieldAttribute) && (
        <DefaultValueSelector
          type={type}
          value={defalutValue}
          setValue={setDefaultValue}
        />
      )}
      <button
        className="rounded bg-red-300 hover:bg-orange-500 w-fit mx-auto px-2 "
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
