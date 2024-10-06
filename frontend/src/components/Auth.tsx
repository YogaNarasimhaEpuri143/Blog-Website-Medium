import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@yogadev/medium-common";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      // Zod ignore the name in case of signin route.
      // Better Pattern, Code in Seperate Components.  (Consider Readability)
      console.log(postInputs);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (e) {
      // alert the user here that the request failed
      toast("Error, While Signing Up");
      console.log(e);
    }
  }

  return (
    <div className="h-screen flex justify-center">
      <div className="flex w-3/5 max-w-80 justify-center flex-col ">
        <div>
          <div className="text-4xl font-bold">Create an account</div>
          <div className="text-slate-500 pt-1">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
              {type === "signup" ? "Login" : "Sign up"}
            </Link>
          </div>
        </div>

        {type === "signup" ? (
          <LabelledInput
            label="Name"
            placeholder="Yoga Narasimha..."
            onChange={(e) => {
              setPostInputs({ ...postInputs, name: (e.target as HTMLInputElement).value });
            }}
          />
        ) : null}

        <LabelledInput
          label="Username"
          placeholder="m@example.com"
          onChange={(e) => {
            setPostInputs({ ...postInputs, username: (e.target as HTMLInputElement).value });
          }}
        />

        <LabelledInput
          label="Password"
          placeholder=""
          type="password"
          onChange={(e) => {
            setPostInputs({ ...postInputs, password: (e.target as HTMLInputElement).value });
          }}
        />
        <button
          onClick={sendRequest}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-5"
        >
          {type === "signin" ? "Singn In" : "Sign Up"}
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

interface LablledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent) => void;
}

function LabelledInput({ label, placeholder, type, onChange }: LablledInputType) {
  return (
    <div>
      <div>
        <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          onChange={onChange}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

// Dot in html ==> Unicode
// avatar in tailwindcss
// state management, put the data fetched from the DB in state.
// 