import { useDispatch, useSelector } from "react-redux";
import Teeth from "./Teeth";
import { useEffect } from "react";
import { setState } from "../redux/reducers/patientReducer";

export default function PatientInfoDisabled() {

  const auth = useSelector((state) => state.auth);
  const patient = useSelector((state) => state.patient);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPatientData = async () => {
      const response = await fetch(`http://localhost:4000/api/patients/myself`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch(setState(json));
      }
    };

    if (auth.user) {
      fetchPatientData();
    }
  }, [auth.user, dispatch]);


return (
    <div
      className="flex flex-col items-center w-full gap-6 my-4"
    >
      <div className="flex flex-col items-start gap-4 mb-12 form-items">
        <div>
          <label htmlFor="name">Patient Name:</label>
          <input
            disabled
            className=""
            type="text"
            name="name"
            id="name"
            value={patient?.name}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Patient Birth Date:</label>
          <input
            disabled
            type="date"
            name="birthDate"
            id="birthDate"
            value={
              patient?.birthDate &&
              new Date(patient?.birthDate).toISOString().split("T")[0]
            }
          />
        </div>
        <div>
          <label className="cursor-pointer" htmlFor="isAdult">
            Is Patient an adult?:
          </label>
          <input
            disabled
            type="checkbox"
            name="isAdult"
            id="isAdult"
            checked={patient?.isAdult}
            value={patient?.isAdult}
          />
        </div>
        <div className={`${!patient?.isAdult && "hidden"}`}>
          <label className="cursor-pointer" htmlFor="hasWisdomTeeth">
            Does the patient have wisdom teeth?:
          </label>
          <input
            disabled
            type="checkbox"
            name="hasWisdomTeeth"
            id="hasWisdomTeeth"
            checked={patient?.hasWisdomTeeth}
            value={patient?.hasWisdomTeeth}
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-start w-2/3">
          <Teeth isDisabled={true}/>
        </div>
      </div>
    </div>
  );
}
