"use client";

import { useRef, useCallback } from "react";

import Canvas from "@/app/components/Canvas";
import MainMenu from "@/app/components/MainMenu";
import CreateEntity from "./modal/CreateEntity";
import CreateField from "./modal/CreateField";

import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import SchemaPanel from "./SchemaPanel";
import classNames from "classnames";
import styles from "./App.module.css";

import { useState, useEffect } from "react";
import { Schema, Model, IntType, DataType, Field } from "prismadesign-lib";
import { generatePrismaFromSchema } from "../services/schema-api";

export type ReferenceOptions = {
  references: Model;
};

const schema = new Schema("store");

export default function App() {
  const [createEntity, setCreateEntity] = useState(false);
  const [createField, setCreateField] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [schemaText, setSchemaText] = useState("");

  useEffect(() => {
    const createMenuFunction = (event: KeyboardEvent) => {
      if (
        !createEntity &&
        !createField &&
        (event.key === "m" || event.key === "M")
      ) {
        fnCreateModel();
        event.preventDefault();
      } else if (
        !createEntity &&
        !createField &&
        (event.key === "f" || event.key === "F")
      ) {
        fnCreateField();
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
        generateSchema={async () => {
          const serialized = schema.toSerial();
          const res = await generatePrismaFromSchema(serialized);
          setSchemaText(res);
        }}
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
        schema={schema}
        submit={(
          name: string,
          type: DataType,
          refOptions: ReferenceOptions | undefined
        ) => {
          try {
            if (selectedModel) {
              const field = selectedModel.addField(name, type);
              if (refOptions) {
                console.log(refOptions);
                field.setReference(refOptions.references.fields[0]);
              }
              console.log(field.model);
            }
          } catch (error) {
            notify(error);
          }
          setCreateField(false);
        }}
      />

      <Toaster />
      <SchemaPanel schema={schema} formattedText={schemaText} />
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
