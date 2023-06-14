"use client";
import React, { useState } from "react";
import { Schema, SerializedSchema } from "prismadesign-lib";
import { FaRegCopy } from "react-icons/fa";

type Props = {
  formattedText?: string;
};

export default function SchemaPanel(props: Props) {
  const { formattedText } = props;
  const [copyMsg, setCopyMsg] = useState(false);
  return (
    <div className="fixed w-full bottom-0 ">
      <div className="relative z-50 w-full bg-blue-500  whitespace-pre-wrap font-mono">
        {formattedText
          ? formattedText
          : `Click "Generate" to generate .prisma file`}
        <div className=" text-white absolute top-2 right-2 flex flex-col items-end">
          <FaRegCopy
            className="hover:cursor-pointer "
            onClick={() => {
              if (formattedText) {
                navigator.clipboard.writeText(formattedText);
                setCopyMsg(true);
                setTimeout(() => {
                  setCopyMsg(false);
                }, 2000);
              }
            }}
          />
          <span className={`text text-xs ${copyMsg ? "" : "hidden"} `}>
            Copied to clipboard
          </span>
        </div>
      </div>
    </div>
  );
}
