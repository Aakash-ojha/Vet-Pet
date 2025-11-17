import React from "react";
import { specialityData } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const SpecialityMenu = () => {
  const navigate = useNavigate();
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply Browse our trusted doctors or use "Find by Specialty" for precise
        needs. Easily book the right professional for your pet.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-12xl mx-auto ">
        {specialityData.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-[1.5rem] overflow-hidden flex flex-col md:flex-row md:items-center shadow-2xl"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full md:w-1/3 h-64 object-cover rounded-xl duration-500 hover:scale-110"
            />
            <div
              onClick={() => navigate("/services")}
              className="p-6 text-left cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-blue-800 underline underline-offset-4">
                {feature.title}
              </h3>
              <p className="text-gray-700 mt-2 leading-relaxed  ">
                {feature.description}
              </p>
            </div>
          </div>
        ))}

        <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-xl">
          <img
            src="./src/assets/dogPic.jpg"
            alt=""
            className="w-full md:w-1/3 h-64 object-cover rounded-xl duration-500 hover:scale-110"
          />

          <div>
            <h1>Easily Find the Right Doctor for Your Pet Around You</h1>
            <Link
              to={`/doctors?speciality=${encodeURIComponent(
                specialityData.title
              )}`}
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
            >
              Find Doctors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
