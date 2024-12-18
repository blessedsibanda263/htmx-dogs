import { Context, Hono } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { DogRow } from "../components/dog/Row";
import { DogForm } from "../components/dog/Form";
import { DogRowList } from "../components/dog/RowList";
import { dataSource } from "../config/datasource.config";
import { createDog, Dog } from "../entities";

const dogRouter = new Hono();

const SELECTED_ID = "selectedId";

const dogRepo = dataSource.getRepository(Dog);

dogRouter.get("/table-rows", async (c: Context) => {
  let dogs = await dogRepo.find();
  return c.html(DogRowList(dogs));
});

dogRouter.post("/", async (c: Context) => {
  const formData = await c.req.formData();
  const name = (formData.get("name") as string) || "";
  const breed = (formData.get("breed") as string) || "";
  const dog = await dogRepo.save(createDog(name, breed));
  return c.html(DogRow(dog), 201);
});

dogRouter.put("/select/:id", (c: Context) => {
  setCookie(c, SELECTED_ID, c.req.param("id"));
  c.header("HX-Trigger", "selection-change");
  return c.body(null);
});

dogRouter.put("/:id", async (c: Context) => {
  const id = Number(c.req.param("id"));
  const formData = await c.req.formData();
  const name = (formData.get("name") as string) || "";
  const breed = (formData.get("breed") as string) || "";
  const dog = await dogRepo.findOneBy({ id });
  if (dog != null) {
    dog.name = name;
    dog.breed = breed;
    setCookie(c, SELECTED_ID, "");
    c.header("HX-Trigger", "selection-change");
    return c.html(DogRow(dog, true));
  } else {
    return c.body(null, 404);
  }
});

dogRouter.put("/deselect", (c: Context) => {
  setCookie(c, SELECTED_ID, "");
  c.header("HX-Trigger", "selection-change");
  return c.body(null);
});

dogRouter.delete("/:id", async (c: Context) => {
  const id = Number(c.req.param("id"));
  await dogRepo.delete({ id });
  return c.body(null);
});

dogRouter.get("/form", async (c: Context) => {
  let id = Number(getCookie(c, SELECTED_ID) || null);
  const selectedDog = await dogRepo.findOneBy({ id });
  if (selectedDog) return c.html(DogForm(selectedDog));
  else return c.body(null, 404);
});

export default dogRouter;
