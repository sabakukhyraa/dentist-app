import Teeth from "./Teeth.jsx";
export default function PatientInfo() {
  return (
    <div>
      <h1>Ali Kerem Ata</h1>
      <p>Yaşı: 22</p>
      <Teeth isAdult={true} hasWisdomTeeth={true} />
      <i>Hasta Bilgilerinin Kaydedilme Tarihi: 01.01.2023</i>
      <i>Hasta Bilgilerinin Son Değiştirilme Tarihi: 01.01.2024</i>
    </div>
  );
}
