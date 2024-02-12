import { useState } from "react";
import Teeth from "./Teeth.jsx";

export default function NewPatient() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    isAdult: true,
    hasWisdomTeeth: false,
    definedTeeth: [],
  });

const handleInputChange = (event) => {
  const { name, value, type, checked } = event.target;
  const newValue = type === "checkbox" ? checked : value;

  setFormData((old) => ({
    ...old,
    [name]: newValue,
  }));
};


  return (
    <form>
      <div>
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="birthDate">Patient Birth Date:</label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          value={formData?.birthDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="isAdult">Is Patient an Adult?:</label>
        <input
          type="checkbox"
          name="isAdult"
          id="isAdult"
          checked={formData.isAdult}
          value={formData.isAdult}
          onChange={handleInputChange}
        />
      </div>
      <div className={`${!formData.isAdult && "hidden"}`}>
        <label htmlFor="hasWisdomTeeth">
          Does the patient have wisdom teeth?:
        </label>
        <input
          type="checkbox"
          name="hasWisdomTeeth"
          id="hasWisdomTeeth"
          checked={formData.hasWisdomTeeth}
          value={formData.hasWisdomTeeth}
          onChange={handleInputChange}
        />
      </div>
      <Teeth
        hasWisdomTeeth={formData.hasWisdomTeeth}
        isAdult={formData.isAdult}
        definedTeeth={formData.definedTeeth}
        isForm={true}
        handleInputChange={handleInputChange}
      />
    </form>
  );
}
