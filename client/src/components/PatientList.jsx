import { useNavigate } from "react-router-dom"
import { setState } from "../redux/reducers/patientReducer";
import { useDispatch } from "react-redux";
export default function PatientList({ patientName, patientId }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPatient = async () => {
    const response = await fetch(
      `http://localhost:4000/api/patients/${patientId}`
    );
    const json = await response.json();

    if (response.ok) {
      json.birthDate = new Date(json.birthDate).toISOString().split("T")[0];
      dispatch(setState(json));
      navigate("/patient");
    }
  };

  return <li className="w-full p-2 text-center transition-all duration-300 ease-in-out border-t-2 cursor-pointer border-x-2 hover:bg-sky-500 hover:text-white" onClick={fetchPatient}>{patientName}</li>;
}
