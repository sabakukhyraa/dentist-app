import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  updateTreatment,
  removeTreatment,
  addTreatment,
} from "../redux/reducers/definedToothReducer";
import { addDefinedTeeth } from "../redux/reducers/patientReducer";
import { useEffect } from "react";
export default function DefineTooth({
  setIsModalOpen,
  setToothState,
}) {
  const definedTooth = useSelector((state) => state.definedTooth);
  const dispatch = useDispatch();

  function handleTreatment(event, index) {
    const { value } = event.target;
    dispatch(updateTreatment({ index, value }));
  }

  async function handleTreatmentRemoval(treat) {
    dispatch(removeTreatment(treat));
  }

  // TODO: Treatment ve description silindiğinde diş hala defined kalıyor.

  useEffect(() => {
    if (definedTooth.description || (definedTooth.treatmentsBefore.length > 0)) {
      dispatch(addDefinedTeeth(definedTooth));
    }
  }, [definedTooth, dispatch]);

  const treatments = definedTooth.treatmentsBefore.map((treat, index) => {
    return (
      <li className="flex justify-between p-1 border" key={index}>
        <div>
          <label className="mr-4" htmlFor={`treatment-name-${index}`}>
            Treatment {index}
          </label>
          <input
            className="px-2 py-1"
            type="text"
            name={`treatment-name-${index}`}
            id={`treatment-name-${index}`}
            value={treat}
            onChange={(event) => handleTreatment(event, index, definedTooth)}
          />
        </div>
        <button onClick={() => handleTreatmentRemoval(treat, definedTooth)} className="w-fit">
          Remove
        </button>
      </li>
    );
  });

  function handleInput(event) {
    dispatch(setDescription(event.target.value));
    dispatch(addDefinedTeeth(definedTooth));
  }

  function closeModal() {
    setToothState(null);
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-4 text-xl">
      <button className="self-end text-3xl" onClick={closeModal}>
        X
      </button>
      <div className="text-3xl">Tooth Number: {definedTooth.toothNumber}</div>
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
          value={definedTooth.description}
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col gap-4 p-4 px-2 border rounded">
        <h2 className="text-3xl">Treatments applied before</h2>
        <ul className="flex flex-col w-full gap-2">{treatments}</ul>
        <button onClick={() => dispatch(addTreatment())} type="button">Add Treatment</button>
      </div>
    </div>
  );
}
