import axios from "axios";

const uploadFile = async (formData: FormData) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return result;
};

const getPosts = async ({
  limit,
  offset,
  search,
}: {
  limit?: number;
  offset?: number;
  search?: string;
}) => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
    params: {
      limit,
      offset,
      search,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export { uploadFile, getPosts };
