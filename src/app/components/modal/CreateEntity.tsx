"use client";

import React, { useState, useRef, useEffect } from "react";

type Props = {
  hidden: boolean;
  submit?: (name: string, createId?: boolean) => void;
};

export default function CreateEntity(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [toCreateId, setToCreateId] = useState(true);
  function submit() {
    if (props.submit) {
      props.submit(name, toCreateId);
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
      <label>
        Model name
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
      </label>
      <label>
        Create id field?
        <input
          className=""
          type="checkbox"
          checked={toCreateId}
          onChange={(e) => setToCreateId(e.target.checked)}
        />
      </label>
      <button
        className="rounded bg-orange-300 hover:bg-orange-500 w-fit mx-auto px-2 "
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
