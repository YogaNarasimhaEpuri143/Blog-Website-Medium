import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-screen lg:w-[75%] xl:w-[40%]">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <BlogCard authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={"2nd Feb 2024"} id={blog.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
