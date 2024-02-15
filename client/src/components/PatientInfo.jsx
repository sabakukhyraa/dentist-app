import { useDispatch, useSelector } from "react-redux";
import { resetPatientState, setBirthDate, setName, toggleHasWisdomTeeth, toggleIsAdult } from "../redux/reducers/patientReducer.js";
import Teeth from "./Teeth.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PatientInfo({isNew = false}) {
  const location = useLocation();

  const patient = useSelector(state => state.patient)
  const dispatch = useDispatch()

  const [error, setError] = useState(null);
  console.log(patient);

  useEffect(() => {
    if (location.pathname === "new-patient") {
      dispatch(resetPatientState());
    }
  }, [dispatch, location.pathname]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/patients", {
      method: "POST",
      body: JSON.stringify(patient),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json()

    if (!response.ok) {
      setError(json.message);
    }
    if (response.ok) {
      dispatch(resetPatientState())
      setError(null)
      console.log('New patient added.', json)
    }
  }

  return (
    <form
      className="flex flex-col items-center w-full gap-6 my-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-4 mb-12 form-items">
        <div>
          <label htmlFor="name">Patient Name:</label>
          <input
            className=""
            type="text"
            name="name"
            id="name"
            value={patient.name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Patient Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={patient.birthDate}
            onChange={(e) => dispatch(setBirthDate(e.target.value))}
          />
        </div>
        <div>
          <label className="cursor-pointer" htmlFor="isAdult">
            Is Patient an adult?:
          </label>
          <input
            type="checkbox"
            name="isAdult"
            id="isAdult"
            checked={patient.isAdult}
            value={patient.isAdult}
            onChange={(e) => dispatch(toggleIsAdult(e.target.value))}
          />
        </div>
        <div className={`${!patient.isAdult && "hidden"}`}>
          <label className="cursor-pointer" htmlFor="hasWisdomTeeth">
            Does the patient have wisdom teeth?:
          </label>
          <input
            type="checkbox"
            name="hasWisdomTeeth"
            id="hasWisdomTeeth"
            checked={patient.hasWisdomTeeth}
            value={patient.hasWisdomTeeth}
            onChange={(e) => dispatch(toggleHasWisdomTeeth(e.target.value))}
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-start w-2/3">
          <Teeth />
        </div>
      </div>
      <div className="flex justify-between w-full">
        {!isNew && (
          <div className="text-xs italic">
            <p>
              Patient Information Recording Date:{" "}
              {new Date(patient.createdAt).toISOString().split("T")[0]}
            </p>
            <p>
              Last Modification Date of Patient Information:
              {new Date(patient.updatedAt).toISOString().split("T")[0]}
            </p>
          </div>
        )}
        <div>
          {error && <div>{error}</div>}
          <button
            className="px-5 py-1 text-xl text-white rounded-md bg-sky-500"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
