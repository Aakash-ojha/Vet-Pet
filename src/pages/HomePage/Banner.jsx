import { useNavigate } from "react-router-dom";
import { resources } from "../../assets/assets.js";

function Banner() {
  const navigate = useNavigate();

  function handleBookNow() {
    navigate("/booking");
  }

  return (
    <div className="flex flex-wrap items-center justify-between bg-primary rounded-2xl p-6 sm:p-10 md:p-14 my-20 md:mx-10 shadow-lg">
      {/* Left Side */}
      <div className="flex flex-col gap-5 w-full md:w-1/2">
        <h1 className="text-xl md:text-5xl font-extrabold text-amber-50 leading-tight">
          🚨 Book Emergency
        </h1>

        <p className="text-lg md:text-xl text-amber-100">
          Get urgent help — fast, secure, and reliable! Our team is ready 24/7
          to assist you and your beloved animals.
        </p>

        <p className="text-sm md:text-base text-amber-200 max-w-md">
          Whether it's a critical situation or minor concern, book your
          appointment now and get professional veterinary care at your
          fingertips.
        </p>

        <button
          onClick={handleBookNow}
          className="bg-amber-50 text-primary font-semibold py-3 px-12 rounded-lg shadow hover:bg-amber-100 transition duration-300 w-fit"
        >
          Book Now
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src={resources.appointment_img}
          alt="Emergency Appointment"
          className="w-64 md:w-80 rounded-xl"
        />
      </div>
    </div>
  );
}

export default Banner;
