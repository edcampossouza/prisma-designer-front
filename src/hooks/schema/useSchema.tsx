import useAsync from "../useAsync";
import { SerializedSchema } from "prismadesign-lib";
import * as schemaApi from "@/app/services/schema-api";

export function useSaveSchema() {
  const _useSaveSchema = useAsync(schemaApi.saveSchema, false);

  return {
    saveSchema: _useSaveSchema.act,
    saveLoading: _useSaveSchema.loading,
    saveError: _useSaveSchema.error,
  };
}

type schema = {
  name: string;
  id: number;
};

export function useGetSchemas(immediate: boolean = true) {
  const _useGetSchemas = useAsync<schema[]>(schemaApi.getSchemas, immediate);

  return {
    schemas: _useGetSchemas.data as unknown as schema[],
    getSchemasError: _useGetSchemas.error,
    schemasLoading: _useGetSchemas.loading,
    getSchemas: _useGetSchemas.act,
  };
}

export function useGetSchema() {
  const _useGetSchema = useAsync<
    SerializedSchema & {
      coordinates?: { x: number; y: number; name: string }[];
    }
  >(schemaApi.getSchema, false);

  return {
    schema: _useGetSchema.data,
    getSchemaError: _useGetSchema.error,
    schemaLoading: _useGetSchema.loading,
    getSchema: _useGetSchema.act,
  };
}
