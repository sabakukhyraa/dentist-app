import { createContext, useState } from "react";
import PatientInfo from "./components/PatientInfo.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/TheHeader.jsx";
import Patients from "./pages/Patients.jsx";

export const PatientContext = createContext();

function App() {
  const [extractedPatient, setExtractedPatient] = useState();
  const patient = useSelector((state) => state.patient);

  return (
    <PatientContext.Provider value={{ extractedPatient, setExtractedPatient }}>
      <Router>
        <div className="flex flex-col items-center w-full bg-gray-100">
          <Header />
          <div className="container">
            <div className="w-full min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/my-patients" element={<Patients />} />

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
                  path="/new-patient"
                  element={<PatientInfo isNew={true} />}
                />

                <Route path="/login" element={<Login />} />

                <Route path="/sign-up" element={<Register />} />
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
