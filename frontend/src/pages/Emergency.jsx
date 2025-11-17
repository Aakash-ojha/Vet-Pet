import React from "react";

import { useState } from "react";
function Emergency() {
  const [formData, setFormData] = useState({
    description: "",
    phone: "",
    animalType: "",
    animalAge: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you can handle form submission, e.g. send data to backend or show confirmation
    alert(`Appointment booked!\n
    Description: ${formData.description}
    Phone: ${formData.phone}
    Animal: ${formData.animalType}
    Age: ${formData.animalAge}`);
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-primary rounded-xl shadow-lg text-amber-50">
      <h2 className="text-3xl font-bold mb-6">
        Book Your Emergency Appointment
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Describe Your Emergency:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the issue"
            required
            className="w-full p-3 mt-1 rounded-md text-primary"
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your contact number"
            required
            className="w-full p-3 mt-1 rounded-md text-primary"
          />
        </label>

        <label>
          Animal Type:
          <input
            type="text"
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            placeholder="Dog, Cat, etc."
            required
            className="w-full p-3 mt-1 rounded-md text-primary"
          />
        </label>

        <label>
          Animal Age:
          <input
            type="number"
            name="animalAge"
            value={formData.animalAge}
            onChange={handleChange}
            placeholder="Age in years"
            required
            min="0"
            className="w-full p-3 mt-1 rounded-md text-primary"
          />
        </label>

        <button
          type="submit"
          className="bg-amber-50 text-primary font-semibold py-3 rounded-lg hover:bg-amber-100 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Emergency;
