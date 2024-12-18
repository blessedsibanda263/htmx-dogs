import "reflect-metadata";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import dogRouter from "./routes/dogs";
import homeRouter from "./routes/home";
import { DogsPage } from "./pages/Dogs";
import { dataSource } from "./config/datasource.config";

const app = new Hono();
app.use(logger());

try {
  const { isInitialized } = await dataSource.initialize();
  console.log(`Database initialize status: ${isInitialized}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}

app.get("/", (c) => c.html(DogsPage()));

app.use("/*", serveStatic({ root: "public" }));

app.route("/dogs", dogRouter);
app.route("/home", homeRouter);

export default app;
