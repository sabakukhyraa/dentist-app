import { Link } from "react-router-dom";

export default function Home(
  // { doctorName, numberOfPatients }
) {
  const doctorName = "Emre Metin"; // temporary
  const numberOfPatients = 24; // temporary
  return (
    <div className="flex flex-col items-center my-12">
      <h1 className="mb-2 text-5xl font-bold">
        Welcome, <span className="text-sky-500">{doctorName}</span>
      </h1>

      <h5 className="">
          You have{" "}
        <span className="text-sky-500">
          {numberOfPatients > 1
            ? `${numberOfPatients} patients`
            : `only ${numberOfPatients} patient`}.
        </span>
      </h5>
      <nav className="my-12 space-x-4">
        <Link className="link-button" to={"/my-patients"}>
          <span>Your patients</span>
        </Link>
        <Link className="link-button" to={"/new-patient"}>
          <span>Create new patient</span>
        </Link>
      </nav>
    </div>
  );
}
