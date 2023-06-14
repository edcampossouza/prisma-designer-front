"use client";
import React from "react";
import { Schema, SerializedSchema } from "prismadesign-lib";

type Props = {
  schema: Schema;
  formattedText?: string;
};

function serializeSchema(schema: SerializedSchema) {
  let file = "";
  schema.models.forEach((model) => {
    file += ` model ${model.name} { \n`;
    model.fields.forEach((field) => {
      file += `\t\t${field.name}  ${field.type}\n`;
      if (field.references) {
        file += `\t\t${field.references.model.toLowerCase()} ${
          field.references.model
        } @relation (fields: [${field.name}], references: [${
          field.references.field
        }])
          
          \n`;
      }
    });
    file += "} \n";
  });
  return file;
}

export default function SchemaPanel(props: Props) {
  const { formattedText, schema } = props;
  return (
    <div className="fixed bottom-0 z-50 w-full bg-blue-500  whitespace-pre-wrap">
      {formattedText ? formattedText : serializeSchema(schema.toSerial())}
    </div>
  );
}
