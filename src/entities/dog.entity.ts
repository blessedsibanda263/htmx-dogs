import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dogs" })
export class Dog {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  breed!: string;
}

export const createDog = (name: string, breed: string) => {
  let dog = new Dog();
  dog.name = name;
  dog.breed = breed;
  return dog;
};
