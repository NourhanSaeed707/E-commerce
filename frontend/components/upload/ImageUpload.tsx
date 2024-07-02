import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import FetchToken from "@/helper/token";
import client from "@/client/client";
import { uploadImage } from "@/services/uploader/uploadService";

const { Dragger } = Upload;

const ImageUpload = ({ setImagesList, imagesList }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [tokenState, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      console.log("geett token in image hook");
      const { accessToken } = await FetchToken();
      console.log(accessToken);
      setToken(accessToken.token);
    };
    fetchToken();
  }, []);

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    console.log("insiiiiide custom req");
    try {
      const imageUrl = await uploadImage(file, tokenState); // Call the service function to upload image
      onSuccess(null, file); // Call onSuccess with null (or undefined) as first argument
      setImagesList([...imagesList, imageUrl]);
      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const onChange = (info: any) => {
    const { status } = info.file;
    console.log("infooo file: ", info.file);
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };

  const props = {
    name: "file",
    multiple: true,
    action: "/api/images/upload",
    customRequest,
    onChange,
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for multiple files.</p>
      </Dragger>
      <div style={{ marginTop: 16 }}>
        {imagesList &&
          imagesList.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`uploaded ${index}`}
              style={{ width: "200px", margin: "10px" }}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageUpload;
