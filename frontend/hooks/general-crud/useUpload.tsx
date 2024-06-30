import client from "@/client/client";
import FetchToken from "@/helper/token";
import { useEffect, useState } from "react";

export default function useUploadImage(addImage) {
  const apiUrl = "/api/images/upload";
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenState, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      console.log("geett token in image hook");
      const { accessToken } = await FetchToken();
      console.log(accessToken)
      setToken(accessToken.token);
    };
    fetchToken();
  }, []);

  const uploadImages = async (options: any) => {
    console.log("toooooken from image hook: ", tokenState);
    const { onSuccess, onError, file, onProgress } = options;
    const imageURL = (
      await client.post(`${apiUrl}/${file.name}`, null, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${tokenState}`,
        },
      })
    ).data;
    console.log("imaaaaage url: ", imageURL);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", await imageURL);
    setLoading(true);
    xhr.upload.onprogress = (event: any) => {
      onProgress({ percent: (event.loaded / event.total) * 100 }, file);
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess(null, file);
          addImage(xhr.responseURL.split("?")[0]);
          setLoading(false);
        } else {
          onError(xhr.responseURL, xhr.response, file);
          setLoading(false);
        }
      }
    };
    xhr.send(file);
  };

  return {
    uploadImages,
  };
}
