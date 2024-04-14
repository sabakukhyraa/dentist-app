import { useEffect, useState, useContext } from "react";
import PatientList from "../components/PatientList";
import { PatientContext } from "../App";
import { Link } from "react-router-dom";
import Icons from "../components/Icons";
import { useSelector } from "react-redux";

export default function Patients() {

  const auth = useSelector((state) => state.auth);

  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { extractedPatient } = useContext(PatientContext);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:4000/api/patients", {
        headers: {
          'Authorization': `Bearer ${auth.user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setPatients(json);
      }
    };

    if (auth.user) {
      fetchPatients();
    }
  }, [auth.user, extractedPatient]);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchKey.toLowerCase())
  );


  return (
    <div className="flex flex-col justify-between gap-4 my-4 md:flex-row">
      <div className="flex flex-col order-2 w-full gap-4 md:-order-1">
        <ul className="w-full space-y-2">
          {patients &&
            filteredPatients.map((p) => (
              <PatientList key={p._id} patient={p} />
            ))}
        </ul>
        <Link to="/new-patient" className="w-full link-button">
          Add New Patient
        </Link>
      </div>
      <div className="flex items-center self-start justify-start pl-2 bg-white">
        <input
          className="px-2 py-1 text-lg bg-transparent border-0"
          type="text"
          name="search-key"
          id="search-key"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search patient"
        />
        <label htmlFor="search-key">
          <Icons iconName={"Search"} />
        </label>
      </div>
    </div>
  );
}
