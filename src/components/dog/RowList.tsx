import { Dog } from "../../entities/dog.entity";
import { DogRow } from "./Row";

export const DogRowList = (dogs: Array<Dog>) => (
  <>{dogs.map((dog) => DogRow(dog))}</>
);
