import { useContext } from "react";
import { StateContext } from "../../App";
// eslint-disable-next-line react/prop-types
export default function Tooth({ d, className, toothIndex }) {
  const { toothState, setToothState } = useContext(StateContext);
  return (
    <path
      onClick={() => setToothState(toothIndex)}
      className={`choisable-tooth cursor-pointer ${
        toothState == toothIndex && "!fill-sky-500"
      } ${className || ""}`}
      d={d}
      strokeLinecap="round"
      strokeLinejoin="miter"
      strokeMiterlimit={4}
      strokeOpacity={1}
    />
  );
}
