import { Dog } from "../../models/dog";
import { DogRow } from "./Row";

export const DogRowList = (dogs: Array<Dog>) => (
  <>{dogs.map((dog) => DogRow(dog))}</>
);
