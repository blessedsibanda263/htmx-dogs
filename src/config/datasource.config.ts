import "reflect-metadata";
import { DataSource } from "typeorm";
import * as entities from "../entities";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blessed",
  password: "1234pass",
  database: "htmx_dogs",
  synchronize: true,
  entities: [entities.Dog],
  logging: true,
});

let dogRepo = await dataSource.getRepository(entities.Dog);
dogRepo.save(entities.createDog("Comet", "Whippet"));
dogRepo.save(entities.createDog("Oscar", "German Shorthaired Pointer"));
