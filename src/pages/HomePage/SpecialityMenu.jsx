import React from "react";
import { specialityData } from "../../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="#speciality">
      <h1>Find by Speciality</h1>
      <p>
        Browse our trusted doctors or use "Find by Specialty" for precise needs.
        From General Practice to Oncology or Ophthalmology, easily book the
        right professional for your pet.
      </p>
      <div className="flex flex-row">
        {specialityData.map((item, index) => (
          <Link to={`/doctors/${item.speciality}`} key={item.speciality}>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-2 overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
              <img
                src={item.image}
                alt={item.speciality}
                className="flex flex-col items-center text-center group object-content"
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
