import { useSelector } from "react-redux";
import Teeth from "./Teeth.jsx";

export default function PatientInfo() {

  const patient = useSelector(state => state.patient)
  return (
    <div className="flex flex-col items-start w-1/2 gap-6">
      <div className="mb-12">
        <h1 className="text-3xl text-center">{patient.name}</h1>
        <p className="text-center">Birthdate: {patient.birthDate}</p>
      </div>
      <Teeth />
      <div className="self-end text-xs italic">
        <p>Patient Information Recording Date: {patient.createdAt}</p>
        <p>
          Last Modification Date of Patient Information: {patient.updatedAt}
        </p>
      </div>
    </div>
  );
}
