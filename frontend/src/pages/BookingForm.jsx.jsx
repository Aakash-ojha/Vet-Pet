// src/components/BookingForm.jsx
import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked for ${formData.name} on ${formData.date}`);
    setFormData({ name: "", email: "", service: "", date: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow-md mb-16"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Book a Service Appointment
      </h2>

      <label className="block mb-2 font-semibold">Full Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Email Address</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Select Service</label>
      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">-- Choose a service --</option>
        <option value="Pet Wellness">Pet Wellness</option>
        <option value="Vaccination">Vaccination</option>
        <option value="Grooming">Grooming</option>
        <option value="Dental Care">Dental Care</option>
        <option value="Surgery">Surgery</option>
      </select>

      <label className="block mb-2 font-semibold">Preferred Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Additional Message</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
        placeholder="Any additional information"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default BookingForm;
