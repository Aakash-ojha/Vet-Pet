import React from "react";
import { assets } from "../../01_assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleBookAppointmentClick = (e) => {
    e.preventDefault();
    const specialitySection = document.getElementById("speciality");
    if (specialitySection) {
      navigate("#speciality");
      specialitySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-4 md:px-8 lg:px-12  overflow-hidden">
      {/* Left side  */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-3 py-6 m-auto md:py-[8vw] md:mb-[-15px] ">
        <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight ">
          Book Appointment
          <br />
          With Trusted Doctors
          <br />
          for your pet
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-20"
            src={assets.group_profiles}
            alt={assets.group_profiles}
          />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment
          </p>
        </div>

        <a
          href="#speciality"
          onClick={handleBookAppointmentClick}
          className="flex items-center gap-2 bg-white px-3 py-3
        rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-colors duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
        >
          Book appointment <img className="w-3" src={assets.arrow_icon} />
        </a>
      </div>

      {/* Right side */}
      <div className="md:w-1/2 relative flex items-end min-h[200px] md:min-h-[300px] lg:min-h-[350px]">
        <img
          className="w-full h-full md:absolute md:bottom-0   md:left-0 md:right-0 rounded-large object-contain"
          src={assets.header_img}
          alt="Trusted Doctors"
        />
      </div>
    </div>
  );
};

export default Header;
