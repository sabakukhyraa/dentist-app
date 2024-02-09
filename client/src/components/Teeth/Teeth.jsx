import { teethAttributes } from "../../services/teethData.js";
import { useState } from "react";

export default function Teeth() {
  const [toothState, setToothState] = useState(0);

  const teeth = teethAttributes.map((tooth, index) => {
    const pathMap = tooth.path.map((path, i) => {
      return (
        <path
          key={`tooth-${i}`}
          d={path}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeMiterlimit={4}
          strokeOpacity={1}
        />
      );
    });
    return (
      <svg
        key={index}
        onClick={() => setToothState(tooth.parentIndex)}
        className={`choisable-tooth cursor-pointer ${
          toothState == tooth.parentIndex && "!fill-sky-500"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="289.61084"
        height="370.54398"
      >
        {pathMap}
      </svg>
    );
  });
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="289.61084"
        height="370.54398"
      >
        {teeth}
      </svg>{" "}
      <div>{toothState}</div>
    </>
  );
}
