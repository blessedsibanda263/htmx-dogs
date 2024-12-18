import { Context, Hono } from "hono";
import { HomePage } from "../pages/Home";

const homeRouter = new Hono();

homeRouter.get("/", (c: Context) => {
  return c.html(HomePage("The Home Page"));
});

export default homeRouter;
