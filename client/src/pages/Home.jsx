import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [numberOfPatients, setNumberOfPatients] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDoctorName = async () => {
      const response = await fetch("http://localhost:4000/api/doctors/", {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setName(json.name);
      }
    };

    const fetchPatientNumber = async () => {
      const response = await fetch("http://localhost:4000/api/patients/count", {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setNumberOfPatients(json);
      }
    }

    const fetchPatientName = async () => {
      const response = await fetch(
        `http://localhost:4000/api/patients/myself?onlyName=true`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setName(json.name);
      }
    };

    if (auth.user?.role == "Doctor") {
      fetchDoctorName();
      fetchPatientNumber();
    } else {
      fetchPatientName();
    }
  }, [auth.user]);

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
      {auth.user?.role == "Doctor" && (
        <h5 className="">
          You have{" "}
          <span className="text-sky-500">
            {numberOfPatients != 1
              ? `${numberOfPatients} patient(s)`
              : `only ${numberOfPatients} patient`}
            .
          </span>
        </h5>
      )}
      {auth.user?.role == "Doctor" ? (
        <nav className="my-12 space-x-4">
          <Link className="link-button" to={"/my-patients"}>
            <span>Your patients</span>
          </Link>
          <Link className="link-button" to={"/new-patient"}>
            <span>Create new patient</span>
          </Link>
        </nav>
      ) : (
        <nav className="my-12 space-x-4">
          <Link className="link-button" to={"/patient"}>
            Show my patient data
          </Link>
        </nav>
      )}
    </div>
  );
}
