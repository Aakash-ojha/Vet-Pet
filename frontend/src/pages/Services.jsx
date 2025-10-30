import { useState } from "react";
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

import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const services = [
    {
      slug: "the-best-doctors",
      icon: <Stethoscope className="w-8 h-8 text-blue-600" />,
      title: "The Best Doctors",
      description:
        "Our app helps you find qualified, caring professionals who look well beyond to place the focus on you and your pet.",
    },
    {
      slug: "dentistry",
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Dentistry",
      description:
        "Complete dental care, adult ultrasonic dental scaling, polishing, tooth extractions, and minor oral surgery.",
    },
    {
      slug: "minor-major-surgery",
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Minor & Major Surgery",
      description:
        "We offer complete medical and surgical procedures including Spay & Neuter, orthopedic surgery, and soft tissue surgery.",
    },
    {
      slug: "isolation-room",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Separate Isolation Room",
      description:
        "The isolation room is specially designed and equipped for infectious cases. We provide rapid lab testing, snap tests, and refractometry.",
    },
    {
      slug: "pet-smart",
      icon: <Pill className="w-8 h-8 text-blue-600" />,
      title: "Pet Smart",
      description:
        "We’ve developed an in-house pet market with all pet accessories, food, shampoos, and tick/flea prevention products.",
    },
    {
      slug: "emergency-opd",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "24 hour / 365 days Emergency & O.P.D",
      description:
        "The hospital is well equipped to receive and treat medical emergencies around the clock.",
    },
    {
      slug: "x-ray-services",
      icon: <X className="w-8 h-8 text-blue-600" />,
      title: "X-Ray",
      description:
        "We offer X-ray services, Macintosh access, and pet travel documentation including health certification for international movement.",
    },
    {
      slug: "wellness-vaccination",
      icon: <Syringe className="w-8 h-8 text-blue-600" />,
      title: "Wellness Exam & Vaccination",
      description:
        "Routine health care includes physical exams, vaccinations, de-worming, and tick/flea prevention. We follow international standards.",
    },
    {
      slug: "home-service",
      icon: <Home className="w-8 h-8 text-blue-600" />,
      title: "Home Service",
      description:
        "Our qualified doctors are equipped to treat medical emergencies at your home for pets and all types of domestic animals.",
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
              onClick={() => navigate(`/services/${service.slug}`)}
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
          <button
            id="booking-form"
            onClick={() => navigate("/services/form")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
