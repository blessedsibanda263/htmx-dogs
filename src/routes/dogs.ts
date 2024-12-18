import { Context, Hono } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { addDog, dogs } from "../models/dog";
import { DogRow } from "../components/dog/Row";
import { DogForm } from "../components/dog/Form";
import { DogRowList } from "../components/dog/RowList";

const dogRouter = new Hono();

const SELECTED_ID = "selectedId";

dogRouter.get("/table-rows", (c: Context) => {
  const sortedDogs = Array.from(dogs.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return c.html(DogRowList(sortedDogs));
});

dogRouter.post("/", async (c: Context) => {
  const formData = await c.req.formData();
  const name = (formData.get("name") as string) || "";
  const breed = (formData.get("breed") as string) || "";
  const dog = addDog(name, breed);
  return c.html(DogRow(dog), 201);
});

dogRouter.put("/select/:id", (c: Context) => {
  setCookie(c, SELECTED_ID, c.req.param("id"));
  c.header("HX-Trigger", "selection-change");
  return c.body(null);
});

dogRouter.put("/:id", async (c: Context) => {
  const id = c.req.param("id");
  const formData = await c.req.formData();
  const name = (formData.get("name") as string) || "";
  const breed = (formData.get("breed") as string) || "";
  const updatedDog = { id, name, breed };
  dogs.set(id, updatedDog);
  setCookie(c, SELECTED_ID, "");
  c.header("HX-Trigger", "selection-change");
  return c.html(DogRow(updatedDog, true));
});

dogRouter.put("/deselect", (c: Context) => {
  setCookie(c, SELECTED_ID, "");
  c.header("HX-Trigger", "selection-change");
  return c.body(null);
});

dogRouter.delete("/:id", (c: Context) => {
  const id = c.req.param("id");
  dogs.delete(id);
  return c.body(null);
});

dogRouter.get("/form", (c: Context) => {
  const selectedDog = dogs.get(getCookie(c, SELECTED_ID) || "");
  return c.html(DogForm(selectedDog));
});

export default dogRouter;
