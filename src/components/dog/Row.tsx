import { Dog } from "../../entities/dog.entity";

export function DogRow(dog: Dog, updating: boolean = false) {
  // if the dog is being updated, we want to perform an out-of-band swap
  // so a new table row can replace the existing one.
  const attrs: { [key: string]: string } = {};
  if (updating) attrs["hx-swap-oob"] = "true";

  return (
    <tr className="on-hover" id={`row-${dog.id}`} {...attrs}>
      <td>{dog.name}</td>
      <td>{dog.breed}</td>
      <td className="buttons">
        <button
          className="show-on-hover button is-small is-primary"
          hx-confirm="Are you sure?"
          hx-delete={`/dogs/${dog.id}`}
          hx-target="closest tr"
          hx-swap="outerHTML"
          type="button"
        >
          X
        </button>
        <button
          className="show-on-hover button is-small is-info"
          hx-put={`/dogs/select/${dog.id}`}
          hx-swap="none"
          type="button"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
