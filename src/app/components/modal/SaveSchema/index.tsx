import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UserInfo } from "@/app/util/auth";
import { UserContext } from "@/context/user.context";
import { GraphicContext } from "@/context/graphic.context";
import {
  useSaveSchema,
  useGetSchemas,
  useGetSchema,
} from "@/hooks/schema/useSchema";
import { Schema, deserializeSchema } from "prismadesign-lib";

import { loadingSpinner } from "../../spinner/spinner";

type Props = {
  hidden: boolean;
  close: Function;
  schema: Schema;
  setIsTyping: (typing: boolean) => void;
  userInfo?: UserInfo;
};

export default function SaveSchema(props: Props) {
  const {
    notifyError,
    setSchema: loadSchema,
    setUser,
    user: userInfo,
  } = useContext(UserContext);
  const { positions, setPositions } = useContext(GraphicContext);
  const { saveSchema, saveLoading } = useSaveSchema();
  const { schemas, schemasLoading, getSchemas } =
    useGetSchemas(false);
  const { schema: fetchedSchema, getSchema, schemaLoading } = useGetSchema();

  const [newSchemaName, setNewSchemaName] = useState(props.schema.name);

  async function save() {
    try {
      const serializedSchema = props.schema.toSerial();
      serializedSchema.name = newSchemaName;
      const coords: { name: string; x: number; y: number }[] = Object.keys(
        positions
      ).map((o) => ({
        name: o,
        x: positions[o].x,
        y: positions[o].y,
      }));
      await saveSchema({ ...serializedSchema, coordinates: coords });
      getSchemas();
    } catch (error) {
      notifyError(error);
    }
  }

  async function loadSchemas() {
    try {
      if (userInfo) {
        await getSchemas();
      }
    } catch (error) {
      setUser(undefined);
    }
  }

  useEffect(() => {
    loadSchemas();
  }, [userInfo]);

  useEffect(() => {
    try {
      if (fetchedSchema) {
        const deserialized = deserializeSchema(fetchedSchema);
        if (fetchedSchema.coordinates) {
          const _positions = fetchedSchema.coordinates.reduce(
            (p: Record<string, { x: number; y: number }>, c) => {
              const res = p;
              res[c.name] = { x: c.x, y: c.y };
              return res;
            },
            {}
          );
          setPositions(_positions);
        }
        loadSchema(deserialized);
        props.close();
      }
    } catch (error) {
      notifyError(error);
    }
  }, [fetchedSchema]);

  return (
    <div
      className={`fixed inset-0  w-80 h-fit max-h-[50vh] mx-auto my-20 p-4 flex flex-col bg-code-bd text-text-main rounded-lg ${
        props.hidden && "invisible"
      }`}
    >
      <AiOutlineCloseCircle
        className="right-2 absolute text-2xl hover:cursor-pointer"
        onClick={() => props.close()}
      />
      {userInfo ? (
        <>
          <p className="text-lg flex justify-center items-center">
            <span className="text-sm overflow-auto">{userInfo.email}</span>
          </p>
          <label className="text-text-main bg-btn-bg">
            schema:
            <input
              className="font-mono text-text-main bg-btn-bg ml-1"
              value={newSchemaName}
              onChange={(e) => setNewSchemaName(e.target.value)}
              onFocus={() => {
                props.setIsTyping(true);
              }}
              onBlur={() => props.setIsTyping(false)}
            />
          </label>
          {saveLoading ? (
            <span className="text-center">saving...</span>
          ) : (
            <button className="font-mono" onClick={save}>
              save
            </button>
          )}
          {schemasLoading && <div className="mx-auto">{loadingSpinner}</div>}
          {!schemaLoading && schemas && schemas.length > 0 && (
            <ul className="p-2 overflow-y-auto">
              <h4>Your schemas:</h4>
              {schemas &&
                schemas.map((schema) => (
                  <li
                    className="font-mono flex justify-between w-full"
                    key={schema.id}
                  >
                    {schema.name}
                    <button
                      className="bg-btn-bg hover:bg-btn-bg-hov rounded-md p-1"
                      onClick={() => {
                        getSchema(schema.name);
                      }}
                    >
                      load
                    </button>
                  </li>
                ))}
            </ul>
          )}
          {(!schemas || schemas.length === 0) && !schemasLoading && (
            <>
              <span>You don&apos;t have any schemas saved yet</span>
            </>
          )}
        </>
      ) : (
        <h3 className="text-lg text-center">Not logged in</h3>
      )}
    </div>
  );
}
