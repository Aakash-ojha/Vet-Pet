import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInformation = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInformation);
    console.log(docInformation);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  return <div>Appointment</div>;
};

export default Appointment;
