"use client";

import Canvas from "@/app/components/Canvas";
import MainMenu from "@/app/components/MainMenu";
import UserWindow from "./modal/User";
import CreateEntity, { EntityCreationOptions } from "./modal/CreateEntity";
import CreateField from "./modal/CreateField";
import { UserContext } from "@/context/user.context";
import { GraphicContext, PositionsRecord } from "@/context/graphic.context";
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
  Field,
  DateTimeType,
  UpdatedAtFieldAttribute,
} from "prismadesign-lib";
import { generatePrismaFromSchema } from "../services/schema-api";
import SaveSchema from "./modal/SaveSchema";

import { nanoid } from "nanoid";
import { isAxiosError } from "axios";
import { useGenerateSchema } from "@/hooks/schema/useSchema";

export type ReferenceOptions = {
  references: Model;
};

// model with its graphic info
export type GrModel = Model & { selected?: boolean };

export default function App() {
  const [createEntity, setCreateEntity] = useState(false);
  const [createField, setCreateField] = useState(false);
  const [userWindow, setUserWindow] = useState(false);
  const [saveWindow, setSaveWindow] = useState(false);
  // to disable shortcuts while typing in input fields
  const [typing, setTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [schema, setSchema] = useState(new Schema(`unnamed-${nanoid(5)}`));

  const [graphicInfo, setGraphicInfo] = useState<PositionsRecord>({});
  const [xBound, setXBound] = useState(0);
  const [yBound, setYBound] = useState(0);

  const [user, setUser] = useState<UserInfo>();

  const { doGenerate, schemaFile, schemaFileLoading } = useGenerateSchema();

  function readUserInfo() {
    const data = getUserToken();
    if (data) setUser(data);
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
        !saveWindow &&
        !typing &&
        (event.key === "m" || event.key === "M")
      ) {
        fnCreateModel();
        event.preventDefault();
      } else if (
        !createEntity &&
        !createField &&
        !userWindow &&
        !saveWindow &&
        !typing &&
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
  }, [createEntity, createField, userWindow, saveWindow, typing]);

  function onSelectModel(model: GrModel) {
    setSelectedModel(model);
    schema.models.forEach((m: GrModel) => {
      delete m.selected;
    });
    model.selected = true;
  }

  function fnCreateField() {
    setCreateField(true);
    setCreateEntity(false);
    setUserWindow(false);
    setSaveWindow(false);
  }

  function fnCreateModel() {
    setCreateField(false);
    setCreateEntity(true);
    setUserWindow(false);
    setSaveWindow(false);
  }
  function fnUserWindow() {
    setCreateField(false);
    setCreateEntity(false);
    setUserWindow(true);
    setSaveWindow(false);
  }
  function fnSaveWindow() {
    setCreateField(false);
    setCreateEntity(false);
    setUserWindow(false);
    setSaveWindow(true);
  }
  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
          notifyError: notify,
          setSchema: setSchema,
        }}
      >
        <GraphicContext.Provider
          value={{
            positions: graphicInfo,
            addPosition: (name, pos) => {
              const newPos = { ...graphicInfo };
              newPos[name] = pos;
              setGraphicInfo(newPos);
              const max_x = Math.max(
                ...Object.keys(newPos).map((name: string) => newPos[name].x),
                0
              );
              const max_y = Math.max(
                ...Object.keys(newPos).map((name: string) => newPos[name].y),
                0
              );
              setXBound(max_x);
              setYBound(max_y);
            },
            setPositions: setGraphicInfo,
            x_bound: xBound,
            y_bound: yBound,
          }}
        >
          <MainMenu
            createEntity={fnCreateModel}
            createField={fnCreateField}
            selectedModel={selectedModel}
            schemaName={schema.name}
            setSchemaName={(name) => {
              const s = new Schema(name);
              s.models = schema.models;
              setSchema(s);
            }}
            toggleUserWindow={fnUserWindow}
            toggleSaveWindow={fnSaveWindow}
            generateSchema={() => doGenerate(schema.toSerial())}
            isDataLoading={schemaFileLoading}
          />
          <Canvas schema={schema} onDragModel={onSelectModel} />
          <UserWindow hidden={!userWindow} close={() => setUserWindow(false)} />
          <SaveSchema
            hidden={!saveWindow}
            close={() => setSaveWindow(false)}
            userInfo={user}
            setIsTyping={(t: boolean) => setTyping(t)}
            schema={schema}
          />
          <CreateEntity
            hidden={!createEntity}
            cancel={() => setCreateEntity(false)}
            submit={(name: string, options: EntityCreationOptions) => {
              try {
                const model = schema.addModel(name);
                if (options.idField) {
                  model.addField("id", IntType, "autoincrement()", [
                    IdFieldAttribute,
                    DefaultFieldAttribute,
                  ]);
                }
                if (options.createdAtField) {
                  model.addField("createdAt", DateTimeType, "now()", [
                    DefaultFieldAttribute,
                  ]);
                }
                if (options.updatedAtField) {
                  model.addField("updatedAt", DateTimeType, undefined, [
                    UpdatedAtFieldAttribute,
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
            cancel={() => setCreateField(false)}
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
        </GraphicContext.Provider>

        <Toaster />
        <SchemaPanel formattedText={schemaFile} />
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
          <h1>Error</h1>
          <p>
            {(() => {
              if (isAxiosError(error)) {
                return error.response?.data?.message || error.message;
              } else {
                return error.message;
              }
            })()}
          </p>
        </div>
        <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
          <MdOutlineClose />
        </div>
      </div>
    ),
    { id: "schema-notification", position: "top-center" }
  );
}
