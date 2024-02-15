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

  function handleTreatmentRemoval(treatIndex) {
    dispatch(removeTreatment(treatIndex));
  }

  // TODO: Treatment ve description silindiğinde diş hala defined kalıyor.

  useEffect(() => {
    if (definedTooth.description || (definedTooth.treatmentsBefore.length > 0)) {
      dispatch(addDefinedTeeth(definedTooth));
    }
  }, [definedTooth, dispatch]);

  const treatments = definedTooth.treatmentsBefore.map((treat, index) => {
    return (
      <li className="flex justify-between p-1" key={index}>
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
        <button
          onClick={() => handleTreatmentRemoval(index)}
          className="w-fit"
          type="button"
        >
          <svg
            className="ml-1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 128 128"
          >
            <path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path>
          </svg>
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
    <div className="flex flex-col gap-4 define-tooth">
      <button className="self-end" onClick={closeModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30px"
          height="30px"
          viewBox="0 0 50 50"
        >
          <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
        </svg>
      </button>
      <div className="">Tooth Number: {definedTooth.toothNumber}</div>
      <div className="flex gap-4">
        <label className="" htmlFor="description">
          Description:{" "}
        </label>
        <textarea
          className="w-full px-2"
          type="text"
          name="description"
          id="description"
          rows={4}
          value={definedTooth.description}
          onChange={handleInput}
        />
      </div>
      <div className="flex flex-col gap-4 p-4 px-2 rounded">
        <h2 className="">Treatments applied before</h2>
        <ul className="flex flex-col w-full gap-2">{treatments}</ul>
        <button onClick={() => dispatch(addTreatment())} type="button">
          Add Treatment
        </button>
      </div>
    </div>
  );
}
