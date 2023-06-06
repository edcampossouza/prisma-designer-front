"use client";

import Canvas from "@/app/components/Canvas";
import MainMenu from "@/app/components/MainMenu";
import CreateEntity from "./modal/CreateEntity";

import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import classNames from "classnames";
import styles from "./App.module.css";

import { useState } from "react";
import { Model, Schema } from "prismadesign-lib";

const schema = new Schema("store");

// schema.addModel("post")
// schema.models[0].addField("postId", new DataType("Int"))
export default function App() {
  const [createEntity, setCreateEntity] = useState(false);
  return (
    <>
      <MainMenu createEntity={() => setCreateEntity(!createEntity)} />
      <Canvas schema={schema} />
      <CreateEntity
        hidden={!createEntity}
        submit={(name: string) => {
          try {
            schema.addModel(name);
          } catch (error) {
            console.log(error);
            notify(error);
          }
          setCreateEntity(false);
        }}
      />
      <Toaster />
    </>
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
