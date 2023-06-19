"use client";

import React, { useState, useRef, useEffect } from "react";

type Props = {
  hidden: boolean;
  submit?: (name: string, createId?: boolean) => void;
  cancel?: Function;
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

  function cancel() {
    if (props.cancel) props.cancel();
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
      } p-2`}
    >
      <table>
        <tbody>
          <tr>
            <td>
              <span className="pr-2">Model name:</span>
            </td>
            <td>
              <input
                ref={inputRef}
                className="text-lg bg-slate-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") {
                    submit();
                  } else if (event.key === "Escape") {
                    cancel();
                  }
                }}
              />
            </td>
          </tr>
          <tr>
            <td className="pr-2 pt-2">
              <span className="">Create id field?</span>
            </td>
            <td className="pr-2 pt-2">
              <input
                className="w-5 h-5"
                type="checkbox"
                checked={toCreateId}
                onChange={(e) => setToCreateId(e.target.checked)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-around">
        <button
          className="rounded bg-green-300 hover:bg-green-500 w-fit px-2 "
          onClick={submit}
        >
          Create
        </button>
        <button
          className="rounded bg-orange-300 hover:bg-orange-500 w-fit px-2 "
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
