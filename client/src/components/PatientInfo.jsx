import Teeth from "./Teeth.jsx";
export default function PatientInfo() {
  return (
    <div>
      <h1>Ali Kerem Ata</h1>
      <p>Yaşı: 22</p>
      <Teeth
        isAdult={true}
        hasWisdomTeeth={true}
        definedTeeth={[
          {
            toothNumber: 27,
            description: "Bla Bla",
            treatmentsBefore: ["Implant", "Whitening"],
          },
          {
            toothNumber: 33,
            description: "Bla Bla",
            treatmentsBefore: ["Implant", "Whitening"],
          },
        ]}
      />
      <i>Hasta Bilgilerinin Kaydedilme Tarihi: 01.01.2023</i>
      <i>Hasta Bilgilerinin Son Değiştirilme Tarihi: 01.01.2024</i>
    </div>
  );
}
