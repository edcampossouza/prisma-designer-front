"use client";

import React, { useState, useRef, useEffect } from "react";
import TypeOptions from "./TypeOptions";
import { DataType, Schema, FieldAttribute } from "prismadesign-lib";
import { ReferenceOptions } from "../../App";

type Props = {
  hidden: boolean;
  submit: (
    name: string,
    type: DataType,
    fieldAttributes: FieldAttribute[],
    references?: ReferenceOptions
  ) => void;
  schema: Schema;
};

export default function CreateField(props: Props) {
  const [type, setType] = useState<DataType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [attributes, setAttributes] = useState<FieldAttribute[]>([]);
  const [referenceOptions, setReferenceOptions] = useState<ReferenceOptions>();
  const [name, setName] = useState("");
  function submit() {
    if (props.submit && type !== null) {
      props.submit(name, type, attributes, referenceOptions);
      setName("");
      setAttributes([]);
      setReferenceOptions(undefined);
    }
  }

  function setFieldType(type: DataType) {
    setType(type);
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
        attributes={attributes}
        schema={props.schema}
      />
      <button
        className="rounded bg-red-300 hover:bg-orange-500 w-fit mx-auto px-2 "
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
