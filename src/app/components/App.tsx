"use client";

import { useRef, useCallback } from "react";

import Canvas from "@/app/components/Canvas";
import MainMenu from "@/app/components/MainMenu";
import CreateEntity from "./modal/CreateEntity";
import CreateField from "./modal/CreateField";

import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import classNames from "classnames";
import styles from "./App.module.css";

import { useState, useEffect } from "react";
import { Schema, Model, IntType } from "prismadesign-lib";

const schema = new Schema("store");

export default function App() {
  const [createEntity, setCreateEntity] = useState(false);
  const [createField, setCreateField] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    const createMenuFunction = (event: KeyboardEvent) => {
      console.log(createEntity, createField, event.key);
      if (
        !createEntity &&
        !createField &&
        (event.key === "n" || event.key === "N")
      ) {
        fnCreateModel();
        event.preventDefault();
      }
    };
    document.addEventListener("keypress", createMenuFunction);
    return () => {
      document.removeEventListener("keypress", createMenuFunction);
    };
  }, [createEntity, createField]);

  function fnCreateField() {
    setCreateField(true);
    setCreateEntity(false);
  }

  function fnCreateModel() {
    setCreateField(false);
    setCreateEntity(true);
  }

  return (
    <div>
      <MainMenu
        createEntity={fnCreateModel}
        createField={fnCreateField}
        selectedModel={selectedModel}
      />
      <Canvas schema={schema} onDragModel={setSelectedModel} />
      <CreateEntity
        hidden={!createEntity}
        submit={(name: string) => {
          try {
            const model = schema.addModel(name);
            setSelectedModel(model);
          } catch (error) {
            notify(error);
          }
          setCreateEntity(false);
        }}
      />
      <CreateField
        hidden={!createField}
        submit={(name: string) => {
          try {
            console.log(selectedModel);
            if (selectedModel) {
              selectedModel.addField(name, IntType);
            }
          } catch (error) {
            notify(error);
          }
          setCreateField(false);
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
