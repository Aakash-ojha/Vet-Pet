import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const handleMoreClick = () => {
    navigate("/doctors");
    window.scrollTo(0, 0); // Scroll to top after navigation
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full  grid grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((doctor) => (
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

              <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleMoreClick}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
