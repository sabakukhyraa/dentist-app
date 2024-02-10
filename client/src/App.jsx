import { createContext, useState } from "react";

import PatientInfo from "./components/PatientInfo.jsx";
export const StateContext = createContext({
  toothState: null,
});

function App() {
  const [toothState, setToothState] = useState("Soldan Seçiniz");
  return (
    <>
      <StateContext.Provider value={{ toothState, setToothState }}>
        <div className="w-full flex flex-col items-center">
          <PatientInfo
            name={"Ali Kerem Ata"}
            birthDate={"2001-12-16"}
            isAdult={true}
            hasWisdomTeeth={false}
            definedTeeth={[
              {
                toothNumber: 27,
                description:
                  "This report summarizes the patient's dental health condition related to the tooth in question. It is recommended to schedule an appointment for a detailed examination and treatment plan.",
                treatmentsBefore: ["Implant", "Whitening"],
              },
              {
                toothNumber: 33,
                description:
                  "Fillings or extraction may be necessary. Please schedule an appointment for a detailed treatment plan.",
                treatmentsBefore: ["Implant", "Whitening"],
              },
            ]}
            saveDate={"2021-12-12"}
            changeDate={"2023-12-12"}
          />
        </div>
      </StateContext.Provider>
    </>
  );
}

export default App;
