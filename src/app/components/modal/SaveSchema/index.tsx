import React, { useEffect } from "react";
import { UserInfo } from "@/app/util/auth";

type Props = {
  hidden: boolean;
  close: Function;
  schemaName: string | undefined;
  userInfo?: UserInfo;
};

export default function SaveSchema(props: Props) {
  const { userInfo, schemaName } = props;

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
          {userInfo.schemas && userInfo.schemas.length > 0 && (
            <ul className="p-2">
              <h4>Your schemas:</h4>
              {userInfo.schemas.map((schema) => (
                <li className="font-mono" key={schema.id}>
                  {schema.name}
                </li>
              ))}
            </ul>
          )}
          {(!userInfo.schemas || userInfo.schemas.length === 0) && (
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
