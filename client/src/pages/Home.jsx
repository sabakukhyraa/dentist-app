import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchDoctorName = async () => {
      const response = await fetch("http://localhost:4000/api/doctors/");
      const json = await response.json();

      if (response.ok) {
        setName(json.name);
      }
    };

    fetchDoctorName();
  }, []);


  const auth = useSelector((state) => state.auth);

  const numberOfPatients = 24; // temporary
  return (
    <div className="flex flex-col items-center my-12">
      <h1 className="mb-2 text-5xl font-bold">
        Welcome
        {auth.user && (
          <span>
            , <span className="text-sky-500">{name}</span>
          </span>
        )}
      </h1>
      {auth.user && (
        <h5 className="">
          You have{" "}
          <span className="text-sky-500">
            {numberOfPatients > 1
              ? `${numberOfPatients} patients`
              : `only ${numberOfPatients} patient`}
            .
          </span>
        </h5>
      )}
      {auth.user && (
        <nav className="my-12 space-x-4">
          <Link className="link-button" to={"/my-patients"}>
            <span>Your patients</span>
          </Link>
          <Link className="link-button" to={"/new-patient"}>
            <span>Create new patient</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
