"use client";

import { useRef, useCallback } from "react";

import Canvas from "@/app/components/Canvas";
import MainMenu from "@/app/components/MainMenu";
import CreateEntity from "./modal/CreateEntity";

import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import classNames from "classnames";
import styles from "./App.module.css";

import { useState, useEffect } from "react";
import { Schema } from "prismadesign-lib";

const schema = new Schema("store");

export default function App() {
  const [createEntity, setCreateEntity] = useState(false);

  useEffect(() => {
    const createMenuFunction = (event: KeyboardEvent) => {
      console.log(event.key, createEntity, "s");
      if (!createEntity && (event.key === "n" || event.key === "N")) {
        setCreateEntity(true);
        event.preventDefault();
      }
    };
    document.addEventListener("keypress", createMenuFunction);
    return () => {
      document.removeEventListener("keypress", createMenuFunction);
    };
  }, [createEntity]);

  return (
    <div>
      <MainMenu createEntity={() => setCreateEntity(!createEntity)} />
      <Canvas schema={schema} />
      <CreateEntity
        hidden={!createEntity}
        submit={(name: string) => {
          try {
            schema.addModel(name);
          } catch (error) {
            notify(error);
          }
          setCreateEntity(false);
        }}
      />
      <Toaster />
    </div>
  );
}

function notify(error: any) {
  toast.custom(
    (t) => (
      <div
        className={classNames([
          styles.notificationWrapper,
          t.visible ? "top-0" : "-top-96",
        ])}
      >
        <div className={styles.iconWrapper}>
          <HiLightningBolt />
        </div>
        <div className={styles.contentWrapper}>
          <h1>Schema error</h1>
          <p>{error.message}</p>
        </div>
        <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
          <MdOutlineClose />
        </div>
      </div>
    ),
    { id: "schema-notification", position: "top-center" }
  );
}
