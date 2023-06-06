"use client";

import React, { useState, useRef, useEffect } from "react";

type Props = {
  hidden: boolean;
  submit?: Function;
};

export default function CreateEntity(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  function submit() {
    if (props.submit) {
      props.submit(name);
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
      Model name
      <input
        ref={inputRef}
        className="text-lg bg-slate-200"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          console.log(event.key);
          if (event.key === "Enter") {
            submit();
          }
        }}
      />
      <button
        className="rounded bg-orange-300 hover:bg-orange-500 w-fit mx-auto px-2 "
        onClick={submit}
      >
        Create
      </button>
    </div>
  );
}
