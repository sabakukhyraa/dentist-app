import { useNavigate } from "react-router-dom"
import { resetPatientState, setState } from "../redux/reducers/patientReducer";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { PatientContext } from "../App";
import Icons from "./Icons";
export default function PatientList({ patient }) {

  const auth = useSelector((state) => state.auth);

  const { setExtractedPatient } = useContext(PatientContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPatient = () => {
    dispatch(setState(patient));
    setExtractedPatient(patient);
    navigate("/patient");
  };

const deletePatient = async () => {
  const isConfirmed = window.confirm("Are you sure? This cannot be undone!");

  if (isConfirmed) {
    const response = await fetch(
      `http://localhost:4000/api/patients/${patient._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      }
    );

    if (response.ok) {
      setExtractedPatient(null);
      dispatch(resetPatientState());
      navigate("/");
    }
  }
};

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <li className="flex items-center justify-between w-full p-4 transition-all duration-300 ease-in-out bg-white border rounded-md cursor-pointer group hover:bg-sky-500 hover:text-white">
      <div className="w-full" onClick={fetchPatient}>
        <h2 className="text-lg font-bold transition-all duration-300 ease-in-out group-hover:text-white text-sky-500">
          {patient.name}
        </h2>
        <p className="text-sm">
          Age:{" "}
          {currentYear -
            new Date(patient.birthDate).toISOString().split("-")[0]}
        </p>
      </div>
      <button type="button" className="p-4" onClick={deletePatient}>
        <Icons
          iconName={"Trash"}
          className={
            "group-hover:fill-white transition-all duration-300 ease-in-out"
          }
        />
      </button>
    </li>
  );
}
