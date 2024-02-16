import { createContext, useEffect, useState } from "react";
import PatientInfo from "./components/PatientInfo.jsx";
import PatientList from "./components/PatientList.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Icons from "./components/Icons.jsx";

export const PatientContext = createContext();

function App() {
  const [patients, setPatients] = useState([]);
  const [extractedPatient, setExtractedPatient] = useState();
  const [searchKey, setSearchKey] = useState("");

  const patient = useSelector((state) => state.patient);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:4000/api/patients");
      const json = await response.json();

      if (response.ok) {
        setPatients(json);
      }
    };

    fetchPatients();
  }, [extractedPatient]);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <PatientContext.Provider value={{ extractedPatient, setExtractedPatient }}>
      <Router>
        <div className="flex flex-col items-center w-full bg-gray-100">
          <div className="w-full py-8 bg-white rounded shadow-md">
            <div className="container">
              <h1 className="text-3xl font-bold text-sky-500">
                <Link to={"/"}>Dentist App</Link>
              </h1>
            </div>
          </div>
          <div className="container">
            <div className="w-full min-h-screen">
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
                    <div className="flex justify-between gap-4 my-4">
                      <div className="flex flex-col w-full gap-4">
                        <ul className="w-full space-y-2">
                          {patients &&
                            filteredPatients.map((p) => (
                              <PatientList key={p._id} patient={p} />
                            ))}
                        </ul>
                        <Link
                          to="/new-patient"
                          className="w-full p-2 text-center text-white rounded-md bg-sky-500"
                        >
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
                  }
                />

                <Route
                  path="/new-patient"
                  element={<PatientInfo isNew={true} />}
                />
              </Routes>
            </div>
          </div>
          <footer className="w-full py-8 mt-4 bg-white rounded shadow-md">
            <div className="container">
              <div className="space-y-4 font-light">
                <p>
                  The purpose of this project is to create a web application
                  where dentists can keep notes about their patients and
                  patients can access information about their dental health. The
                  project aims to serve as a learning tool for backend
                  development while providing a practical application scenario.
                </p>
                <p>
                  The web application will have two main user roles: dentists
                  and patients. Dentists will be able to register, log in, and
                  create patient profiles. Within these profiles, they can
                  record notes about each patient&apos;s dental history,
                  treatments, appointments, and any relevant medical
                  information. They can also update and delete these records as
                  needed.
                </p>
                <p>
                  On the other hand, patients will have limited access to the
                  platform. They can only log in to view their own profiles
                  which were created by their doctor and include details about
                  their dental visits, treatments received, upcoming
                  appointments, and general dental health advice provided by
                  their dentists.
                </p>
                <p>Developed by Ali Kerem Ata</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </PatientContext.Provider>
  );
}

export default App;
