import { teethAttributes } from "../services/teethData.js";
import { useState } from "react";
import deleteObjectsWithParentIndex from "../services/deleteObjects.js";

export default function Teeth({ hasWisdomTeeth, isAdult, definedTeeth }) {
  const [toothState, setToothState] = useState(0);

  // [
  //  {
  //   toothNumber: 13,
  //   description: String,
  //   treatmentsBefore: Array,
  //  },
  //  {
  //   toothNumber: 26,
  //   description: String,
  //   treatmentsBefore: Array,
  //  },
  // ]

  function findIsDefined(toothNumber) {
    let isDefined = false;
    definedTeeth.forEach((obj) => {
      if (obj.toothNumber === toothNumber) {
        isDefined = true;
      }
    });

    return isDefined;
  }

  function handleToothClick(toothNumber) {
    setToothState(toothNumber);

    // if (isDefined) {
    // } else {
    // }
  }

  const adultTeeth = teethAttributes.slice(0, 32);
  const childTeeth = teethAttributes.slice(32);

  const teethWithoutWisdom = deleteObjectsWithParentIndex(
    adultTeeth,
    [18, 28, 38, 48]
  );

  const teethData = isAdult
    ? hasWisdomTeeth
      ? adultTeeth
      : teethWithoutWisdom
    : childTeeth;

  const teeth = teethData.map((tooth, index) => {
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
        onClick={() => handleToothClick(tooth.parentIndex)}
        className={`choisable-tooth cursor-pointer ${
          toothState == tooth.parentIndex && "!fill-sky-500"
        } ${
          findIsDefined(tooth.parentIndex)
            ? "fill-emerald-500"
            : "fill-transparent"
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
