import React, { useContext, useEffect } from "react";
import { UserInfo } from "@/app/util/auth";
import { UserContext } from "@/context/user.context";
import { GraphicContext } from "@/context/graphic.context";
import {
  useSaveSchema,
  useGetSchemasIm,
  useGetSchema,
} from "@/hooks/schema/useSchema";
import { Schema, deserializeSchema } from "prismadesign-lib";

type Props = {
  hidden: boolean;
  close: Function;
  schemaName: string | undefined;
  schema: Schema;
  userInfo?: UserInfo;
};

export default function SaveSchema(props: Props) {
  const { notifyError, setSchema: loadSchema } = useContext(UserContext);
  const { positions, setPositions } = useContext(GraphicContext);
  const { userInfo, schemaName } = props;
  const { saveSchema, saveError, saveLoading } = useSaveSchema();
  const { schemas, getSchemasError, schemasLoading, getSchemas } =
    useGetSchemasIm();
  const { schema: fetchedSchema, getSchema, schemaLoading } = useGetSchema();

  async function save() {
    try {
      const serializedSchema = props.schema.toSerial();
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
      className={`fixed inset-0  w-80 h-fit mx-auto my-20 flex flex-col bg-gray-100 rounded-lg border-2 border-black ${
        props.hidden && "invisible"
      }`}
    >
      {userInfo ? (
        <>
          <h3 className="text-lg text-center">{userInfo.email}</h3>
          <span className="font-mono">{schemaName}</span>
          {saveLoading ? (
            <span className="text-center">saving...</span>
          ) : (
            <button className="font-mono" onClick={save}>
              save
            </button>
          )}
          {schemas && schemas.length > 0 && (
            <ul className="p-2">
              <h4>Your schemas:</h4>
              {schemas &&
                schemas.map((schema) => (
                  <li
                    className="font-mono flex justify-between w-full"
                    key={schema.id}
                  >
                    {schema.name}
                    <button
                      className="bg-green-300 hover:bg-green-500"
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
          {(!schemas || schemas.length === 0) && (
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
