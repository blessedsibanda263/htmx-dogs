export type Dog = { id: string; name: string; breed: string };

export const dogs = new Map<string, Dog>();

export const addDog = function (name: string, breed: string): Dog {
  const id = crypto.randomUUID();
  const dog = { id, name, breed };
  dogs.set(id, dog);
  return dog;
};

addDog("Comet", "Whippet");
addDog("Oscar", "German Shorthaired Pointer");
