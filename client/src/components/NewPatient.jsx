import { useDispatch, useSelector } from "react-redux";
import { setBirthDate, setName, toggleHasWisdomTeeth, toggleIsAdult } from "../redux/reducers/patientReducer.js";
import Teeth from "./Teeth.jsx";

export default function NewPatient() {

  const patient = useSelector(state => state.patient)
  const dispatch = useDispatch();

  return (
    <form>
      <div>
        <label htmlFor="name">Patient Name:</label>
        <input
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
      <Teeth isForm={true}/>
    </form>
  );
}
