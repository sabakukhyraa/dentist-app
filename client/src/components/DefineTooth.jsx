export default function DefineTooth({
  toothNumber,
  toothDescription,
  toothTreatmentsBefore,
}) {
  const treatments = toothTreatmentsBefore.map((treat, index) => {
    return (
      <div key={index}>
        <label htmlFor={`treatment-name-${index}`}>Treatment {index}</label>
        <input
          type="text"
          name={`treatment-name-${index}`}
          id={`treatment-name-${index}`}
          value={treat}
        />
        <button>Remove</button>
      </div>
    );
  });
  return (
    <div>
      <div>Tooth Number: {toothNumber}</div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={toothDescription || ""}
        />
      </div>
      <div>
        <h2>Treatments applied to {toothNumber}</h2>
        {treatments}
        <button>Add Treatment</button>
      </div>
    </div>
  );
}
