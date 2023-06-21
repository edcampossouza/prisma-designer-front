import React, { useContext } from "react";
import { UserInfo } from "@/app/util/auth";
import { UserContext } from "@/context/user.context";
import { useSaveSchema, useGetSchemasIm } from "@/hooks/schema/useSchema";

type Props = {
  hidden: boolean;
  close: Function;
  schemaName: string | undefined;
  userInfo?: UserInfo;
};

export default function SaveSchema(props: Props) {
  const { notifyError } = useContext(UserContext);
  const { userInfo, schemaName } = props;
  const { saveSchema, saveError, saveLoading } = useSaveSchema();
  const { schemas, getSchemasError, schemasLoading, getSchemas } =
    useGetSchemasIm();

  async function save() {
    try {
      await saveSchema({ name: schemaName });
      getSchemas();
    } catch (error) {
      notifyError(error);
    }
  }

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
                  <li className="font-mono" key={schema.id}>
                    {schema.name}
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
