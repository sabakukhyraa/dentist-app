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
          <PatientInfo />
        </div>
      </StateContext.Provider>
    </>
  );
}

export default App;
