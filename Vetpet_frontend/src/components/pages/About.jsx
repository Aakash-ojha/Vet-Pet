import React from "react";
import { Link } from "react-router-dom";


function About() {
  const services = [
    {
      title: "Buy Pets",
      desc: "Choose from healthy, verified pets including puppies, kittens, and more.",
      icon: "🐶",
      to: "/shop",
      bgColor: "#FFF3E2",   // soft peach background
      iconColor: "#2d2017ff", // warm orange tone
    },
    {
      title: "Vet Appointments",
      desc: "Easily book and manage checkups with experienced veterinarians.",
      icon: "🩺",
      to: "/doctors",
      bgColor: "#E2F5FF",   // light sky blue
      iconColor: "#0e0f0fff", // calm blue tone
    },
  ];

  return (
    <div
      className="container py-5"
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
        lineHeight: "1.7",
      }}
    >
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-4 " style={{ color: "#000000" }}>
          About VetPet
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Making pet care easier, safer, and full of love. Because pets aren't
          just animals they're family.
        </p>
      </div>

      {/* Main Content */}
      <div className="row align-items-start mb-5 " >
        <div className=" mb-4 text-center">
          <p>
            VetPet is an all-in-one platform created to make pet care simpler and
            more convenient. Whether you're looking to adopt, book vet
            appointments, or schedule grooming services, we connect you with
            everything your furry friend needs all in one trusted place.
          </p>
          <p>
            Our mission is to provide a safe, transparent, and compassionate
            experience for every pet lover. Every animal listed on VetPet is
            health-checked by professionals to ensure their well-being.
          </p>
        </div>
      </div>

      <div className="mb-5 text-center">

        <h1 className="fw-bold mb-3" style={{ color: "#000000" }}>
          Why People Choose VetPet
        </h1>
        <ul className="list-group list-group-flush">
          {[
            "Healthy, verified, and well-cared for pets.",
            "Easy online appointments with trusted veterinarians.",
            "Transparent and ethical practices promoting responsible pet ownership.",
            "Guidance on diet, vaccination, and general pet care.",
            "A focus on trust, safety, and compassion in every interaction.",
          ].map((item, i) => (
            <li key={i} className="list-group-item border-0 ps-0">
              ✅ {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Services Section */}
      <div className="mb-5 text-center">
        <h3
          className="fw-bold mb-3"
          style={{ color: "#523624" }}
        >
          Our Services
        </h3>
        <div className="row g-4 justify-content-center">
          {services.map((service, i) => (
            <div key={i} className="col-md-4 col-sm-6">
              <Link
                to={service.to}
                className="text-decoration-none text-dark"
                style={{ display: "block" }}
              >
                <div
                  className="p-4 rounded shadow-sm h-100 hover-card"
                  style={{
                    backgroundColor: service.bgColor,
                    transition: "all 0.3s ease",
                    maxWidth: "350px",
                    margin: "0 auto",
                    border: `2px solid ${service.iconColor}33`,
                  }}
                >
                  <div
                    className="fs-2 mb-3"
                    style={{ color: service.iconColor }}
                  >
                    {service.icon}
                  </div>
                  <h5
                    className="fw-bold mb-2"
                    style={{ color: "#2e2e2e" }}
                  >
                    {service.title}
                  </h5>
                  <p className="text-muted mb-0">{service.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Section */}
      <div className="text-center mb-5">
        <p className="mx-auto" style={{ maxWidth: "700px" }}>
          We aim to build a caring community where pet owners find everything
          they need from expert advice and health support to grooming and
          adoption. Because at <strong>VetPet</strong>, caring for pets means
          caring for family.
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          to="/"
          className="btn btn-info btn-lg rounded-pill px-4 text-white shadow"
        >
          🏠 Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default About;
