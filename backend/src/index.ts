import { Hono } from "hono";

import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

import { cors } from "hono/cors";

// Bindings: These are values that are globally available in your application, such as environment variables.
// Variables: These are additional values that you might want to store in each request context.

const app = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string };
}>();

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
