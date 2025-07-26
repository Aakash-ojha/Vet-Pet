import React from "react";
import { specialityData } from "../../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply Browse our trusted doctors or use "Find by Specialty" for precise
        needs. Easily book the right professional for your pet.
      </p>

      <div className="flex flex-wrap justify-center sm:justify-center gap-12 pt-5 w-full items-center  ">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="  
            hover:translate-y-[-10px] transition-all duration-500 text-center flex flex-col  items-center 
            "
            to={`/doctors/${item.speciality}`}
            key={item.speciality}
          >
            <div className="bg-blue-200 rounded-full w-20 h-20 md:w-24 md:h-24 flex flex-col text-xs items-center justify-center ">
              <img
                className="w-16 sm:w-16 mb-2"
                src={item.image}
                alt={item.speciality}
              />
            </div>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
