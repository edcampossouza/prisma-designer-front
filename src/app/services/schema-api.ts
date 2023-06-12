import api from "./api";

export async function generatePrismaFromSchema(schema: Object) {
  const response = await api.post("/schema/generate", schema);

  return response.data;
}
