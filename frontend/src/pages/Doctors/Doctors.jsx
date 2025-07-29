import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applytFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(
    function () {
      applytFilter();
    },
    [doctors, speciality, applytFilter]
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">
        Browse through the doctors specialist
      </h2>

      <div className="flex flex-col sm:flex-row items-start gap-15 mt-5 ">
        <div className=" flex flex-col gap-8 text-sm text-gray-600 pt-5">
          <p
            className={`w-[94vw] sm:w-auto pl-12 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap`}
          >
            General Check-ups
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-12 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap`}
          >
            Vaccinations
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-12 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap`}
          >
            Behavioral Consultation
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-12 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap`}
          >
            Diagnostics
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-12 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap`}
          >
            Emergency Care
          </p>
        </div>

        <div className="w-full  grid grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {filterDoc.map((doctor) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              key={doctor._id}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translation-all duration-500 "
            >
              <img src={doctor.image} className="bg-blue-50 " />

              <div className="p-4">
                <div className="flex item-center gap-2 text-sm text-center text-green-500">
                  <p></p>
                  <p>Available</p>
                </div>

                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
