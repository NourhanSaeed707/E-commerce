import React, { useEffect, useState } from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FetchToken from "@/helper/token";
import { uploadImage } from "@/services/uploader/uploadService";

const { Dragger } = Upload;

const ImageUpload = ({ setImagesList, imagesList }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [tokenState, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken } = await FetchToken();
      setToken(accessToken.token);
    };
    fetchToken();
  }, []);

  // Initialize fileList with existing imagesList
  useEffect(() => {
    if (imagesList && imagesList.length > 0) {
      const fileList = imagesList.map((image, index) => ({
        uid: index.toString(),
        name: `image-${index}`,
        status: "done",
        imageUrl: image.imageUrl,
      }));
      setFileList(fileList);
    }
  }, [imagesList]);

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const imageUrl = await uploadImage(file, tokenState); // Call the service function to upload image
      onSuccess(null, file); // Call onSuccess with null (or undefined) as first argument
      // Append new image to imagesList
      setImagesList([...imagesList, { imageUrl }]);
      message.success(`${file.name} file uploaded successfully.`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const onChange = (info: any) => {
    const { status } = info.file;
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
    fileList, // Pass fileList state to Dragger component
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
          imagesList.map((image, index) => (
            <img
              key={index}
              src={image && image.imageUrl}
              style={{ width: "200px", margin: "10px" }}
            />
          ))}
      </div>
    </div>
  );
};

export default ImageUpload;
