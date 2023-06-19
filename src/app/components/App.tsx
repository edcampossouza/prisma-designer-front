"use client";

import Canvas from "@/app/components/Canvas";
import MainMenu from "@/app/components/MainMenu";
import UserWindow from "./modal/User";
import CreateEntity from "./modal/CreateEntity";
import CreateField from "./modal/CreateField";
import { UserContext } from "@/context/user.context";
import { UserInfo, getUserToken } from "../util/auth";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import SchemaPanel from "./SchemaPanel";
import classNames from "classnames";
import styles from "./App.module.css";

import { useState, useEffect } from "react";
import {
  Schema,
  Model,
  IntType,
  DataType,
  IdFieldAttribute,
  FieldAttribute,
  DefaultFieldAttribute,
} from "prismadesign-lib";
import { generatePrismaFromSchema } from "../services/schema-api";

export type ReferenceOptions = {
  references: Model;
};

// model with its graphic info
export type GrModel = Model & { selected?: boolean };

const schema = new Schema("store");

export default function App() {
  const [createEntity, setCreateEntity] = useState(false);
  const [createField, setCreateField] = useState(false);
  const [userWindow, setUserWindow] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [schemaText, setSchemaText] = useState("");
  const [user, setUser] = useState<UserInfo>();

  function readUserInfo() {
    const data = getUserToken();
    if (data) setUser(data);
  }

  function onSelectModel(model: GrModel) {
    setSelectedModel(model);
    schema.models.forEach((m: GrModel) => {
      delete m.selected;
    });
    model.selected = true;
  }

  useEffect(() => {
    readUserInfo();
  }, []);

  useEffect(() => {
    const createMenuFunction = (event: KeyboardEvent) => {
      if (
        !createEntity &&
        !createField &&
        !userWindow &&
        (event.key === "m" || event.key === "M")
      ) {
        fnCreateModel();
        event.preventDefault();
      } else if (
        !createEntity &&
        !createField &&
        !userWindow &&
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
  }, [createEntity, createField, userWindow]);

  function fnCreateField() {
    setCreateField(true);
    setCreateEntity(false);
    setUserWindow(false);
  }

  function fnCreateModel() {
    setCreateField(false);
    setCreateEntity(true);
    setUserWindow(false);
  }
  function fnUserWindow() {
    setCreateField(false);
    setCreateEntity(false);
    setUserWindow(true);
  }

  console.log(user);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <MainMenu
          createEntity={fnCreateModel}
          createField={fnCreateField}
          selectedModel={selectedModel}
          toggleUserWindow={fnUserWindow}
          generateSchema={async () => {
            const serialized = schema.toSerial();
            const res = await generatePrismaFromSchema(serialized);
            setSchemaText(res);
          }}
        />
        <Canvas schema={schema} onDragModel={onSelectModel} />
        <UserWindow hidden={!userWindow} close={() => setUserWindow(false)} />
        <CreateEntity
          hidden={!createEntity}
          cancel={() => setCreateEntity(false)}
          submit={(name: string, createId?: boolean) => {
            try {
              const model = schema.addModel(name);
              if (createId) {
                model.addField("id", IntType, "autoincrement()", [
                  IdFieldAttribute,
                  DefaultFieldAttribute,
                ]);
              }
              onSelectModel(model);
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
            fieldAttributes: FieldAttribute[],
            defaultValue?: string,
            refOptions?: ReferenceOptions
          ) => {
            try {
              if (selectedModel) {
                const field = selectedModel.addField(
                  name,
                  type,
                  defaultValue,
                  fieldAttributes
                );
                if (refOptions) {
                  const idField = refOptions.references.getIdField();
                  if (idField === null) {
                    selectedModel.removeField(field);
                    throw new Error(
                      `Cannot set reference to ${refOptions.references.name}: model has no id`
                    );
                  }
                  field.setReference(refOptions.references.fields[0]);
                }
              }
            } catch (error) {
              notify(error);
            }
            setCreateField(false);
          }}
        />

        <Toaster />
        <SchemaPanel formattedText={schemaText} />
      </UserContext.Provider>
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
