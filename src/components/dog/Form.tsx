import { Dog } from "../../entities/dog.entity";

export const DogForm = (selectedDog?: Dog) => {
  const attrs: { [key: string]: string } = {
    "hx-on:htmx:after-request": "this.reset()",
  };
  if (selectedDog) {
    // Update an existing row.
    attrs["hx-put"] = "/dogs/" + selectedDog.id;
  } else {
    // Add a new row
    attrs["hx-post"] = "/dogs";
    attrs["hx-target"] = "tbody";
    attrs["hx-swap"] = "afterbegin";
  }
  return (
    <form hx-disabled-elt="#submit-btn" {...attrs}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={selectedDog?.name ?? ""}
          size={30}
          required
        />
      </div>
      <div>
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          name="breed"
          id="breed"
          value={selectedDog?.breed ?? ""}
          size={30}
          required
        />
      </div>
      <div className="buttons">
        <button class="button is-success is-small" id="submit-btn">
          {selectedDog?.id ? "Update" : "Add"}
        </button>
        {selectedDog?.id && (
          <button type="button" hx-put="/dogs/deselect" hx-swap="none">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
