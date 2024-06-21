import { DeleteService } from "@/services/general/deleteService";
import { DeleteAndGetOneServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useDeleteEntity<T>(apiUrl: string) {
  const token = getCookie("token");
  const [entityId, setEntityId] = useState<Number | null>(null);
  const [updatedEntity, setUpdatedEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callAPI = useCallback(async (id: Number) => {
    setLoading(true);
    const props: DeleteAndGetOneServices = {
      apiUrl,
      token,
      id,
    };
    try {
      const response = await DeleteService({ ...props });
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (entityId) {
      callAPI(entityId);
    }
  }, [callAPI, entityId]);

  return {
    loading,
    response,
    error,
    setEntityId,
    entityId,
  };
}
