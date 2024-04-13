import { useDispatch, useSelector } from "react-redux";
import {
  resetPatientState,
  setBirthDate,
  setName,
  toggleHasWisdomTeeth,
  toggleIsAdult,
} from "../redux/reducers/patientReducer.js";
import Teeth from "./Teeth.jsx";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientContext } from "../App";

export default function PatientInfo({ isNew = false }) {
  const { extractedPatient, setExtractedPatient } = useContext(PatientContext);

  const location = useLocation();
  const navigate = useNavigate();

  const patient = useSelector((state) => state.patient);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.pathname === "/new-patient") {
      dispatch(resetPatientState());
    }
  }, [dispatch, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew) {
      const response = await fetch("http://localhost:4000/api/patients", {
        method: "POST",
        body: JSON.stringify(patient),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
      }
      if (response.ok) {
        dispatch(resetPatientState());
        setError(null);
        setExtractedPatient((old) => !old);
        dispatch(resetPatientState());
        navigate("/");
      }
    } else {
      const updatedPatient = {};

      Object.keys(patient).forEach((property) => {
        if (
          Object.prototype.hasOwnProperty.call(extractedPatient, property) &&
          patient[property] !== extractedPatient[property]
        ) {
          updatedPatient[property] = patient[property];
        }
      });

      // PATCH update to existing patient record
      const response = await fetch(
        `http://localhost:4000/api/patients/${patient._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedPatient),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        setExtractedPatient(null);
      }
      if (response.ok) {
        setError(null);
        setExtractedPatient(null);
        dispatch(resetPatientState());
        navigate("/");
      }
    }
  };

  
  const deletePatient = async () => {

    const isConfirmed = window.confirm("Are you sure? This cannot be undone!");

    if (isConfirmed) {
      const response = await fetch(
        `http://localhost:4000/api/patients/${patient._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setExtractedPatient(null);
        dispatch(resetPatientState());
        navigate("/");
      }
    }
  };


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
            value={
              patient.birthDate &&
              new Date(patient.birthDate).toISOString().split("T")[0]
            }
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
      <div className={`flex justify-between w-full ${isNew && "!justify-end"}`}>
        {!isNew && (
          <div className="text-sm italic font-light">
            <p>
              Created At:{" "}
              {new Date(patient.createdAt).toISOString().split("T")[0]}
            </p>
            <p>
              Updated At:{" "}
              {new Date(patient.updatedAt).toISOString().split("T")[0]}
            </p>
          </div>
        )}
        <div className="self-end">
          {error && <div>{error}</div>}
          {!isNew && (
            <button
              className="px-5 py-1 text-xl text-white bg-red-500 rounded-md"
              type="button"
              onClick={deletePatient}
            >
              Delete
            </button>
          )}
          <button
            className="px-5 py-1 ml-2 text-xl text-white rounded-md bg-sky-500"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
