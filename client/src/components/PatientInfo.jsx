import { useDispatch, useSelector } from "react-redux";
import { resetPatientState, setBirthDate, setName, toggleHasWisdomTeeth, toggleIsAdult } from "../redux/reducers/patientReducer.js";
import Teeth from "./Teeth.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PatientInfo({isNew}) {

  const patient = useSelector(state => state.patient)
  const dispatch = useDispatch()
  const location = useLocation();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.pathname === "/new-patient") {
      dispatch(resetPatientState())
    }
  }, [dispatch, location.pathname]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/patients', {
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
    <form className="flex flex-col items-start w-full gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div>
          <label htmlFor="name">Patient Name:</label>
          <input
            className="text-2xl outline-none"
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
          <label htmlFor="isAdult">Is Patient an Adult?:</label>
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
          <label htmlFor="hasWisdomTeeth">
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
        <Teeth />
      </div>
      {isNew && <div className="self-end text-xs italic">
        <p>Patient Information Recording Date: {patient.createdAt}</p>
        <p>
          Last Modification Date of Patient Information: {patient.updatedAt}
        </p>
      </div>}
      {error}
      <button>Save</button>
    </form>
  );
}
