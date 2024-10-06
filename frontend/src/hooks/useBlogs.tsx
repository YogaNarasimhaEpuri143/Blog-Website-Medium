import axios from "axios";
import { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export function useBlogs() {
  const [loading, SetLoading] = useState<boolean>(true);

  //Even when the array is empty, it's still defined as Blog[] but contains no elements.
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then((response) => {
        setBlogs(response.data.blogs);
        SetLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return {
    loading,
    blogs,
  };
}
