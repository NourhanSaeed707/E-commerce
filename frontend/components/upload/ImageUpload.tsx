// import { UploadFile, UploadProps } from "antd";
// import Dragger from "antd/es/upload/Dragger";
// import React, { useEffect, useState } from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import { RcFile } from "antd/es/upload";
// import { toast } from "react-toastify";
// import { UploadImageProps } from "@/types/image";
// import useUploadImage from "@/hooks/general-crud/useUpload";
// import { uploadImage } from "@/services/uploader/uploadService";

// export default function ImageUpload({
//   size,
//   imagesList,
//   addImage,
//   removeImage,
// }: UploadImageProps) {
//   const [headers, setHeaders] = useState<any>();
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const {uploadImages} = useUploadImage(addImage);

//   useEffect(() => {
//     if (imagesList && imagesList.length > 0) {
//       const listImages: UploadFile[] = [];
//       imagesList.forEach((image, index) =>
//         listImages.push({
//           uid: String(index),
//           name: "image",
//           status: "done",
//           url: image.url,
//         })
//       );
//       setList(listImages);
//     } else {
//       setList([]);
//     }
//   }, [addImage, imagesList]);

//   const beforeUpload = (file: RcFile) => {
//     setHeaders({
//       "x-amz-acl": "public-read",
//       "Content-Type": file.type,
//     });
//     const validateSize = file.size / 1024 / 1024 < size;
//     if (!validateSize) {
//       toast.error("maxium size " + size);
//     }
//     return validateSize;
//   };

//   const handleOnRemove = (file: UploadFile) => removeImage(file.url);

//     const customRequest = async ({ file, onSuccess, onError }: any) => {
//     try {
//       const imageUrl = await uploadImage(file, tokenState); // Call the service function to upload image
//       onSuccess(null, file); // Call onSuccess with null (or undefined) as first argument
//       setImageUrls([...imageUrls, imageUrl]);
//       message.success(`${file.name} file uploaded successfully.`);
//     } catch (error) {
//       onError(error);
//       message.error(`${file.name} file upload failed.`);
//     }
//   };

//   const props: UploadProps = {
//     name: "file",
//     multiple: false,
//     accept: "image/*",
//     beforeUpload,
//     customRequest,
//     headers,
//     listType: "picture-card",
//     onRemove: handleOnRemove,
//     fileList: list,
//   };

//   return (
//     <Dragger {...props}>
//       <p>
//         <InboxOutlined />
//       </p>
//       <p>Tap To Upload Image</p>
//     </Dragger>
//   );
// }

import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import FetchToken from "@/helper/token";
import client from "@/client/client";
import { uploadImage } from "@/services/uploader/uploadService";
// import 'antd/dist/antd.css';

const { Dragger } = Upload;

const ImageUpload = ({ setImagesList, imagesList }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  //   const [imageUrls, setImageUrls] = useState<string[]>([]);
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
      console.log("imaaaaaaage url: ", imageUrl);
      onSuccess(null, file); // Call onSuccess with null (or undefined) as first argument
      setImagesList([...imagesList, imageUrl]);
      console.log("imaaaaaaaaages list: ", imagesList);
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
