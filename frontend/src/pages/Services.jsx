import React from "react";
import {
  Stethoscope,
  Activity,
  Heart,
  Shield,
  Pill,
  Syringe,
  X,
  Home,
  Clock,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="w-8 h-8 text-blue-600 " />,
      title: "The Best Doctors",
      description:
        "Our app help you to find qualified caring professionals who looks well beyond to place the focus on you and your pet",
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Dentistry",
      description:
        "Complete dental care, adult ultrasonic dental scaling, polishing, tooth extractions and minor oral surgery.",
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Minor & Major Surgery",
      description:
        "We offer complete medical & surgery procedures including Spay & Neuter, Orthopedic surgery & soft tissue surgery.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Separate Isolation Room",
      description:
        "The isolation room is specially designed and equipped for infectious cases. We provide it build quick lab testing, snap tests & refractometry.",
    },
    {
      icon: <Pill className="w-8 h-8 text-blue-600" />,
      title: "Pet Smart",
      description:
        "For your flexibility we have developed a Pet market value hospital itself, which requires all pet accessories, pet food choices, pet full plastic shampoos, tick and flea prevention powders.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "24 hour/ 365 days Emergency & O.P.D",
      description:
        "The Hospital is well equipped to receive and treat medical emergencies around the clock.",
    },
    {
      icon: <X className="w-8 h-8 text-blue-600" />,
      title: "X-Ray",
      description:
        "Our hospital is equipped with x-ray, Macintosh & Pet Travel Documentation. We plan 365 marketing (7 days/7:45) and assist with Health & certification for international Pet movement.",
    },
    {
      icon: <Syringe className="w-8 h-8 text-blue-600" />,
      title: "Wellness Exam & Vaccination",
      description:
        "Our routine health care include physical examination of pets, vaccination de-worming and flea & tick prevention. We maintain an international standard vaccination program.",
    },
    {
      icon: <Home className="w-8 h-8 text-blue-600" />,
      title: "Home Service",
      description:
        "Our doctors are well qualified & equipped to handle and treat medical emergencies around the clock to provide home service to your pet and all type of domestic animals.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="relative">
        {/* Background Image Overlay */}
        <div className="h-64 bg-cover bg-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Services
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                We want to work with you to help your pet enjoy a long,
                <span className="text-orange-500 font-medium"> healthy </span>
                and
                <span className="text-orange-500 font-medium"> happy </span>
                life.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              {/* Icon Container */}
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                {service.icon}
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-gray-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Care for Your Pet?
          </h2>
          <p className="text-xl mb-6">
            Contact us today to schedule an appointment
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
