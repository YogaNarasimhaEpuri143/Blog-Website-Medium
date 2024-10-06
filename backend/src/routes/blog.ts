import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { createBlogInput, updateBlogInput } from "@yogadev/medium-common";

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string };
}>();

interface Blog {
  title: string;
  content: string;
}

interface CustomJWTPayload extends JWTPayload {
  id: string;
}

// Authentication Middleware
blogRouter.use("/*", async (c, next) => {
  // Verify the header
  const header = c.req.header("Authorization") || "";

  // Bearer token
  const token = header.split(" ")[1];
  try {
    const response = (await verify(token, c.env.JWT_SECRET)) as CustomJWTPayload;
    console.log(response);

    if (response.id) {
      c.set("userId", response.id);
      await next();
    }

    c.status(403);
    return c.json({ message: "Unauthorized" });
  } catch (error) {
    // Handle the error if the token is invalid or expired
    c.status(403);
    console.log(error);
    return c.json({ message: "You are Not Logged In" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body: Blog = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct" });
  }

  const authorId = c.get("userId");
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  c.status(201);
  return c.json({ message: "Blog Created", id: blog.id });
});

blogRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();
  const { id } = c.req.param();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct" });
  }

  try {
    const blog = await prisma.post.update({
      where: { id: id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ message: "Blog updated successfully" });
  } catch (err) {
    c.status(411);
    return c.json({ message: "Error updating blog", error: err });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ blogs });
  } catch (err) {
    c.status(411);
    return c.json({ message: "Error fetching blogs" });
  }
});

blogRouter.get("/:id", async (c) => {
  console.log("Inside");
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const { id } = c.req.param();
  try {
    const blog = await prisma.post.findFirst({
      where: { id: id },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(blog);

    c.status(200);
    return c.json({ blog });
  } catch (err) {
    c.status(411);
    return c.json({ message: "Error while fetching the data" });
  }
});

// Should never use body in the get request.

// Pagination Ideally
// Button
// When Scrolled.
// Atomfamilies, Selector Families
// Editor, people can put text, images, videos, hyperlinks, ...
// max-w-scree-lg w-full
// draft.js
// tailwindcss [input] [textarea] [skeleton] [avatar] [file-upload] [sidebar] [button]
// default props
// Props destructuring
//git-reset
//git-push-origin-head
