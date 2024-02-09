export default function DefineTooth({ toothNumber, toothData }) {
  return (
    <div>
      <div>Tooth Number: {toothNumber}</div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div>
        <h2>Treatments applied to {toothNumber}</h2>
        <div>
          <label htmlFor="treatment-name-1">Treatment 1</label>
          <input
            type="text"
            name="treatment-name-1"
            id="treatment-name-1"
            value={"Implant"}
          />
          <button>Remove</button>
        </div>
        <div>
          <label htmlFor="treatment-name-2">Treatment 2</label>
          <input
            type="text"
            name="treatment-name-2"
            id="treatment-name-2"
            value={"Whitening"}
          />
          <button>Remove</button>
        </div>
        <button>Add Treatment</button>
      </div>
      <div>{toothData}</div>
    </div>
  );
}
