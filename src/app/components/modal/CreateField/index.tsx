"use client";

import React, { useState, useRef, useEffect } from "react";
import TypeOptions from "./TypeOptions";
import { DataType } from "prismadesign-lib";

type Props = {
  hidden: boolean;
  submit: (name: string, type: DataType) => void;
};

export default function CreateField(props: Props) {
  const [type, setType] = useState<DataType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  function submit() {
    if (props.submit && type !== null) {
      props.submit(name, type);
      setName("");
    }
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
      <TypeOptions selectDataType={setType} />
      <button
        className="rounded bg-red-300 hover:bg-orange-500 w-fit mx-auto px-2 "
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
