import { EditService } from "@/services/general/editService";
import { EditServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useEditEntity<T>(apiUrl: string) {
  const token = getCookie("token");
  const [entityId, setEntityId] = useState<Number | null>(null);
  const [updatedEntity, setUpdatedEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callAPI = useCallback(async (id: Number, body) => {
    setLoading(true);
    setError(null);
    const props: EditServices = {
      apiUrl,
      token,
      id,
      body,
    };
    try {
      const response = await EditService({ ...props });
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (entityId && updatedEntity) {
      callAPI(entityId, updatedEntity);
    }
  }, [callAPI, entityId, updatedEntity]);

  return {
    loading,
    error,
    response,
    setEntityId,
    setUpdatedEntity,
  };
}
