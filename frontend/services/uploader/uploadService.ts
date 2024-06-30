import client from "@/client/client";

export const uploadImage = async (file: File, token) => {
  const apiUrl = "/api/images/upload";
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await client.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.secure_url; // Return the uploaded image URL
  } catch (error) {
    throw new Error("Failed to upload image"); // Throw an error if upload fails
  }
};
