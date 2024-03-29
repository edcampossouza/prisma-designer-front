"use client";

import React, { useState, useRef, useEffect } from "react";

export type EntityCreationOptions = {
  idField: boolean;
  createdAtField: boolean;
  updatedAtField: boolean;
};

type Props = {
  hidden: boolean;
  submit?: (name: string, options: EntityCreationOptions) => void;
  cancel?: Function;
};

export default function CreateEntity(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [toCreateId, setToCreateId] = useState(true);
  const [toCreateCreatedAtField, setToCreateCreatedAtField] = useState(false);
  const [toCreateUpdatedAtField, setToCreateUpdatedAtField] = useState(false);
  function submit() {
    if (props.submit) {
      props.submit(name, {
        idField: toCreateId,
        createdAtField: toCreateCreatedAtField,
        updatedAtField: toCreateUpdatedAtField,
      });
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
      className={`fixed inset-0  w-fit h-fit mx-auto my-20 flex flex-col bg-code-bd text-text-main rounded-lg   ${
        props.hidden && "invisible"
      } p-2 z-50`}
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
                className="text-model-color bg-btn-bg"
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
              <span className="">
                Create <span className="text-field-color">id</span> field?
              </span>
            </td>
            <td className="pr-2 pt-2">
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={toCreateId}
                onChange={(e) => setToCreateId(e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td className="pr-2 pt-2">
              <span className="">
                Create <span className="text-field-color">createdAt</span>{" "}
                field?
              </span>
            </td>
            <td className="pr-2 pt-2">
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={toCreateCreatedAtField}
                onChange={(e) => setToCreateCreatedAtField(e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td className="pr-2 pt-2">
              <span className="">
                Create <span className="text-field-color">updatedAt</span>{" "}
                field?
              </span>
            </td>
            <td className="pr-2 pt-2">
              <input
                className="w-4 h-4"
                type="checkbox"
                checked={toCreateUpdatedAtField}
                onChange={(e) => setToCreateUpdatedAtField(e.target.checked)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-around">
        <button
          className="rounded bg-confirm hover:bg-confirm-hov w-fit px-2 "
          onClick={submit}
        >
          Create
        </button>
        <button
          className="rounded bg-cancel hover:bg-cancel-hov w-fit px-2 "
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
