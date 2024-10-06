import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { signinInput, signupInput } from "@yogadev/medium-common";

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string };
}>();

interface User {
  name: string;
  username: string;
  password: string;
}

interface CustomJWTPayload extends JWTPayload {
  id: string;
}

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body: User = await c.req.json();

  const { success } = signupInput.safeParse(body);

  console.log(success);

  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct" });
  }

  // Zod Validation,
  // Password Hashing

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.username,
        password: body.password,
      },
    });

    // Creating the JWT Token  ==>  payload, secret
    // JWT Can be decoded, But cannot be verified.
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    c.status(201);
    return c.json({ token });

    // Unique Constraint.
  } catch (err) {
    c.status(411); // 411
    return c.text("User already exists");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: body.username } });
    if (!user || user.password !== body.password) {
      c.status(403); // Standard way to tell Unauthorized. (403 statud code)
      return c.json({ message: "Invalid credentials" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (err) {
    // c.status(409) ==> Conflcit, status code.
    c.status(500);
    return c.text("Internal Server Error");
  }
});

// Access Token
// Refresh Token
