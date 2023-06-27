import { SerializedSchema } from "prismadesign-lib";
import { getAuthHeader } from "../util/auth";
import api from "./api";

export async function generatePrismaFromSchema(schema: SerializedSchema) {
  const response = await api.post("/schema/generate", schema);

  return response.data;
}

export async function saveSchema(schema: Object) {
  await api.post("/schema/", schema, { headers: getAuthHeader() });
}

export async function deleteSchema(name: string) {
  await api.delete(`/schema/${name}`, { headers: getAuthHeader() });
}

export async function getSchemas() {
  const result = await api.get("/schema/", { headers: getAuthHeader() });
  return result.data;
}

export async function getSchema(name: string) {
  const result = await api.get(`schema/${name}`, { headers: getAuthHeader() });
  return result.data;
}
