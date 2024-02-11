import { useNavigate } from "react-router-dom"

export default function PatientList({ patientName, patientId, setSelectedPatient }) {

  const navigate = useNavigate();

  const fetchPatient = async () => {
    const response = await fetch(
      `http://localhost:4000/api/patients/${patientId}`
    );
    const json = await response.json();

    if (response.ok) {
      await setSelectedPatient(json);
      navigate("/patient");
    }
  };

  return <li onClick={fetchPatient}>{patientName}</li>;
}
