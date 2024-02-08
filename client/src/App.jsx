import { createContext, useState } from "react";

import TeethNumber from "./components/Teeth/SelectTeeth.jsx";
export const StateContext = createContext({
  toothState: null,
});

function App() {
  const [toothState, setToothState] = useState("Soldan Seçiniz");
  return (
    <>
      <StateContext.Provider value={{ toothState, setToothState }}>
        <TeethNumber />{" "}
      </StateContext.Provider>
    </>
  );
}

export default App;
