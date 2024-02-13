import { teethAttributes } from "../services/teethData.js";
import { useState } from "react";
import deleteObjectsWithParentIndex from "../services/deleteObjects.js";
import DefineTooth from "./DefineTooth.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefinedTooth,
  setToothNumber,
  resetState,
} from "../redux/reducers/definedToothReducer.js";

export default function Teeth({isForm = false}) {

  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient)

  const [toothState, setToothState] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function findDefined(toothNumber) {
    return patient.definedTeeth.find((obj) => obj.toothNumber === toothNumber);
  }

  function handleToothClick(toothNumber) {
    if (findDefined(toothNumber)) {
      dispatch(setDefinedTooth(findDefined(toothNumber)));
    } else {
      dispatch(resetState());
      dispatch(setToothNumber(toothNumber));
    }
    setIsModalOpen(true);
    setToothState(toothNumber);
  }

  const adultTeeth = teethAttributes.slice(0, 32);
  const childTeeth = teethAttributes.slice(32);

  const teethWithoutWisdom = deleteObjectsWithParentIndex(
    adultTeeth,
    [18, 28, 38, 48]
  );

  const teethData = patient.isAdult
    ? patient.hasWisdomTeeth
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
          toothState == tooth.parentIndex ? "!fill-sky-500" : ""
        } ${
          findDefined(tooth.parentIndex)
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
      <div className="flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="289.61084"
          height="370.54398"
        >
          {teeth}
        </svg>{" "}
        {isModalOpen && (
          <DefineTooth
            setIsModalOpen={setIsModalOpen}
            setToothState={setToothState}
            isForm={isForm}
          />
        )}
      </div>
    </>
  );
}
