import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Blogs } from "./pages/Blogs";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import { Publish } from "./pages/Publish";
import NavLayout from "./layouts/NavLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<NavLayout />}>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="blog/:id" element={<Blog />} />
            <Route path="/publish" element={<Publish />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
