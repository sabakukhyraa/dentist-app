import { useEffect, useState } from "react";
import PatientInfo from "./components/PatientInfo.jsx";
import PatientList from "./components/PatientList.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NewPatient from "./components/NewPatient.jsx";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchKey, setSearchKey] = useState("");


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

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <Router>
      <div className="flex flex-col items-center w-full">
        <Routes>
          <Route
            path="/patient"
            element={
              <PatientInfo
                name={selectedPatient?.name}
                birthDate={selectedPatient?.birthDate}
                isAdult={selectedPatient?.isAdult}
                hasWisdomTeeth={selectedPatient?.hasWisdomTeeth}
                definedTeeth={selectedPatient?.definedTeeth}
                saveDate={selectedPatient?.createdAt}
                changeDate={selectedPatient?.updatedAt}
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
                    className="px-2 py-1 my-5 border outline-none"
                    type="text"
                    name="search-key"
                    id="search-key"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                </div>
                <ul className="w-full border-b-2">
                  {patients &&
                    filteredPatients.map((patient) => (
                      <PatientList
                        key={patient._id}
                        patientName={patient.name}
                        patientId={patient._id}
                        setSelectedPatient={setSelectedPatient}
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

          <Route path="/new-patient" element={<NewPatient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
