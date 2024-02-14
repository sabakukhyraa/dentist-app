import { useEffect, useState } from "react";
import PatientInfo from "./components/PatientInfo.jsx";
import PatientList from "./components/PatientList.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [patients, setPatients] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const patient = useSelector(state => state.patient);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:4000/api/patients");
      const json = await response.json();

      if (response.ok) {
        setPatients(json);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <Router>
      <div className="flex flex-col items-center w-full">
        <Routes>
          <Route
            path="/patient"
            element={
              <PatientInfo
                name={patient?.name}
                birthDate={patient?.birthDate}
                isAdult={patient?.isAdult}
                hasWisdomTeeth={patient?.hasWisdomTeeth}
                definedTeeth={patient?.definedTeeth}
                saveDate={patient?.createdAt}
                changeDate={patient?.updatedAt}
              />
            }
          />

          <Route
            path="/"
            element={
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-6 text-2xl">
                  <label htmlFor="search-key">Search:</label>
                  <input
                    className="px-2 py-1 my-5"
                    type="text"
                    name="search-key"
                    id="search-key"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                </div>
                <ul className="w-full border-b-2">
                  {patients &&
                    filteredPatients.map((p) => (
                      <PatientList
                        key={p._id}
                        patientName={p.name}
                        patientId={p._id}
                      />
                    ))}
                </ul>
                <Link
                  to="/new-patient"
                  className="w-full p-2 mt-5 text-white rounded-md bg-sky-500"
                >
                  Add New Patient
                </Link>
              </div>
            }
          />

          <Route path="/new-patient" element={<PatientInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
