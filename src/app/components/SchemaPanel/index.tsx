"use client";
import React, { useState } from "react";
import { FaRegCopy, FaWindowMinimize } from "react-icons/fa";

type Props = {
  formattedText?: string;
};

export default function SchemaPanel(props: Props) {
  const { formattedText } = props;
  const [copyMsg, setCopyMsg] = useState(false);
  const [minimized, setMinimized] = useState(false);
  return (
    <div
      className={`fixed w-full bottom-0 max-h-[50%] z-50 overflow-auto ${
        minimized && "h-8 overflow-hidden"
      }`}
    >
      <div className="relative z-50 w-full bg-code-bd text-text-main whitespace-pre-wrap font-mono">
        {formattedText
          ? formattedText
          : `Click "Generate" to generate .prisma file`}
        <div className=" text-white absolute top-2 right-2 flex flex-col items-end">
          <div className="flex items-center space-x-4">
            <FaWindowMinimize
              className="hover:cursor-pointer"
              onClick={() => setMinimized(!minimized)}
            />
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
          </div>
          <span className={`text text-xs ${copyMsg ? "" : "hidden"} `}>
            Copied to clipboard
          </span>
        </div>
      </div>
    </div>
  );
}
