export default function DefineTooth({
  toothNumber,
  toothDescription,
  toothTreatmentsBefore,
  setIsModalOpen,
  setToothState,
  isForm = false,
}) {
  const treatments = toothTreatmentsBefore.map((treat, index) => {
    return (
      <li className="flex justify-between p-1 border" key={index}>
        <div>
          <label className="mr-4" htmlFor={`treatment-name-${index}`}>
            Treatment {index}
          </label>
          <input
            className="px-2 py-1 border outline-none"
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

  function closeModal() {
    setToothState(null);
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-4 text-xl">
      <button className="self-end text-3xl" onClick={closeModal}>
        X
      </button>
      <div className="text-3xl">Tooth Number: {toothNumber}</div>
      <div className="flex gap-4">
        <label className="" htmlFor="description">
          Description:{" "}
        </label>
        <textarea
          className="w-full px-2 border"
          type="text"
          name="description"
          id="description"
          rows={4}
          value={toothDescription || ""}
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col gap-4 p-4 px-2 border rounded">
        <h2 className="text-3xl">Treatments applied before</h2>
        <ul className="flex flex-col w-full gap-2">{treatments}</ul>
        <button type="button">Add Treatment</button>
      </div>
      {isForm && <button>Save the tooth data</button>}
    </div>
  );
}
