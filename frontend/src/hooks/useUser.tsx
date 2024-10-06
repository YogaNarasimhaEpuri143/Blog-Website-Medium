import axios from "axios";
import { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface User {
  name: string;
}

export function useUser() {
  const [loading, SetLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
      .then((response) => {
        setUser(response.data);
        SetLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return {
    loading,
    user,
  };
}
