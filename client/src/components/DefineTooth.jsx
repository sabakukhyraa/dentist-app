export default function DefineTooth({ toothNumber, toothDescription, toothTreatmentsBefore, setIsModalOpen, }) {


  const treatments = toothTreatmentsBefore.map((treat, index) => {
    return (
      <li className="flex justify-between border p-1" key={index}>
        <div>
          <label className="mr-4" htmlFor={`treatment-name-${index}`}>Treatment {index}</label>
          <input
            className="outline-none border px-2 py-1"
            type="text"
            name={`treatment-name-${index}`}
            id={`treatment-name-${index}`}
            value={treat}
          />
        </div>
        <button className="w-fit">Remove</button>
      </li>
    );
  });

  return (
    <div className="flex flex-col gap-4 text-xl">
      <button
        className="text-3xl self-end"
        onClick={() => setIsModalOpen(false)}
      >
        X
      </button>
      <div className="text-3xl">Tooth Number: {toothNumber}</div>
      <div className="flex gap-4">
        <label className="" htmlFor="description">
          Description:{" "}
        </label>
        <textarea
          className="w-full border px-2"
          type="text"
          name="description"
          id="description"
          rows={4}
          value={toothDescription || ""}
        />
      </div>
      <div className="flex flex-col gap-4 border rounded p-4 px-2">
        <h2 className="text-3xl">
          Treatments applied before
        </h2>
        <ul className="flex flex-col gap-2 w-full">{treatments}</ul>
        <button>Add Treatment</button>
      </div>
    </div>
  );
}
