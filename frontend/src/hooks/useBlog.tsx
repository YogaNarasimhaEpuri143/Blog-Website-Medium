import axios from "axios";
import { useState, useEffect } from "react";
import { Blog } from "./useBlogs";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useBlog({ id }: { id: string }) {
  const [loading, SetLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then((response) => {
        setBlog(response.data.blog);
        SetLoading(false);
      })
      .catch((e) => console.log(e));
  }, [id]);

  return {
    loading,
    blog,
  };
}
