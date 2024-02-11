import Teeth from "./Teeth.jsx";

export default function PatientInfo({
  name,
  birthDate,
  isAdult,
  hasWisdomTeeth,
  definedTeeth,
  saveDate,
  changeDate,
}) {
  return (
    <div className="flex flex-col items-start w-1/2 gap-6">
      <div className="mb-12">
        <h1 className="text-3xl text-center">{name}</h1>
        <p className="text-center">Birthdate: {birthDate}</p>
      </div>
      <Teeth
        isAdult={isAdult}
        hasWisdomTeeth={hasWisdomTeeth}
        definedTeeth={definedTeeth}
      />
      <div className="self-end text-xs italic">
        <p>Patient Information Recording Date: {saveDate}</p>
        <p>Last Modification Date of Patient Information: {changeDate}</p>
      </div>
    </div>
  );
}
