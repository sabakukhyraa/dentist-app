import { useNavigate } from "react-router-dom"
import { setBirthDate, setState } from "../redux/reducers/patientReducer";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { PatientContext } from "../App";
export default function PatientList({ patient }) {

  const { setExtractedPatient } = useContext(PatientContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPatient = () => {
    dispatch(
      setBirthDate(new Date(patient.birthDate).toISOString().split("T")[0])
    );
    dispatch(setState(patient));
    setExtractedPatient(patient);
    navigate("/patient");
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <li
      className="w-full p-4 transition-all duration-300 ease-in-out bg-white border rounded-md cursor-pointer hover:bg-sky-500 hover:text-white"
      onClick={fetchPatient}
    >
      <h2 className="text-lg font-bold text-sky-500">{patient.name}</h2>
      <p className="text-sm">Age: {currentYear - new Date(patient.birthDate).toISOString().split("-")[0]}</p>
    </li>
  );
}
