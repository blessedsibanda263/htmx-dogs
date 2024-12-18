import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import dogRouter from "./routes/dogs";
import homeRouter from "./routes/home";
import { DogsPage } from "./pages/Dogs";

const app = new Hono();
app.use(logger());

app.get("/", (c) => c.html(DogsPage()));

app.use("/*", serveStatic({ root: "public" }));

app.route("/dogs", dogRouter);
app.route("/home", homeRouter);

export default app;
