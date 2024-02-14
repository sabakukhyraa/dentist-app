import { useNavigate } from "react-router-dom"
import { setState } from "../redux/reducers/patientReducer";
import { useDispatch } from "react-redux";
export default function PatientList({ patient }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPatient = async () => {
    const response = await fetch(
      `http://localhost:4000/api/patients/${patient._id}`
    );
    const json = await response.json();

    if (response.ok) {
      json.birthDate = new Date(json.birthDate).toISOString().split("T")[0];
      dispatch(setState(json));
      navigate("/patient");
    }
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <li
      className="w-full p-4 transition-all duration-300 ease-in-out border-t-2 cursor-pointer border-x-2 hover:bg-sky-500 hover:text-white"
      onClick={fetchPatient}
    >
      <h2>{patient.name}</h2>
      <p>Age: {currentYear - new Date(patient.birthDate).toISOString().split("-")[0]}</p>
    </li>
  );
}
