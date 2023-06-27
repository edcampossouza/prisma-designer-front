"use client";
import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FiMaximize, FiMinimize } from "react-icons/fi";

type Props = {
  formattedText?: string;
};

export default function SchemaPanel(props: Props) {
  const { formattedText } = props;
  const [copyMsg, setCopyMsg] = useState(false);
  const [minimized, setMinimized] = useState(true);

  useEffect(() => {
    if (formattedText) setMinimized(false);
  }, [formattedText]);

  const textComponent = (
    <div className="relative z-50 w-full bg-code-bd text-text-main whitespace-pre-wrap font-mono">
      {formattedText
        ? formattedText
        : `Click "Generate" to generate .prisma file`}
      <div className=" text-white absolute top-2 right-2 flex flex-col items-end">
        <div className="flex items-center space-x-4">
          <FiMinimize
            className="hover:cursor-pointer"
            onClick={() => setMinimized(true)}
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
  );

  return (
    <>
      {minimized ? (
        <div
          className="fixed bg-code-bd h-20 w-20 rounded-full bottom-3 right-3 flex items-center justify-center hover:cursor-pointer"
          onClick={() => setMinimized(false)}
        >
          <div className="w-full h-full flex relative items-center justify-center">
            {formattedText && (
              <div className="rounded-full h-5 w-5 bg-confirm top-1 right-1 absolute"></div>
            )}
            <div className="text-3xl text-text-main">
              <FiMaximize />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed w-full bottom-0 max-h-[50%] z-50 overflow-auto">
          {textComponent}
        </div>
      )}
    </>
  );
}
