//Atomfamilies,selectorFamiles

// Medium don't fetches the complete data

import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";

export default function Blogs() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return <div>{(blog && <FullBlog blog={blog} />) || "Error in fetching blog"}</div>;
}
