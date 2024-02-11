import { useEffect, useState } from "react";
import PatientInfo from "./components/PatientInfo.jsx";
import PatientList from "./components/PatientList.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);


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
              <ul>
                {patients &&
                  patients.map((patient) => (
                    <PatientList
                      key={patient._id}
                      patientName={patient.name}
                      patientId={patient._id}
                      setSelectedPatient={setSelectedPatient}
                    />
                  ))}
              </ul>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
