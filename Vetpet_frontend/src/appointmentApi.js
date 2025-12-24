// import api from "./api"; // import your configured Axios instance

// // Base endpoints
// const APPOINTMENT_BASE = "/api/appointments/";
// const PET_BASE = "/api/pets/";
// const DOCTOR_BASE = "/api/doctors/";
// const TREATMENT_BASE = "/api/treatments/";

// // ---------- Appointments ----------

// // Get all appointments
// export const getAppointments = async () => {
//   const response = await api.get(APPOINTMENT_BASE);
//   return response.data;
// };

// // Get appointment by ID
// export const getAppointmentDetail = async (id) => {
//   const response = await api.get(`${APPOINTMENT_BASE}${id}/`);
//   return response.data;
// };

// // Create appointment
// export const createAppointment = async (appointmentData) => {
//   const response = await api.post(APPOINTMENT_BASE, appointmentData);
//   return response.data;
// };

// // Update appointment
// export const updateAppointment = async (id, appointmentData) => {
//   const response = await api.patch(`${APPOINTMENT_BASE}${id}/`, appointmentData);
//   return response.data;
// };

// // Delete appointment
// export const deleteAppointment = async (id) => {
//   const response = await api.delete(`${APPOINTMENT_BASE}${id}/`);
//   return response.data;
// };

// // ---------- Dropdown Data ----------

// // Get all pets
// export const getPets = async () => {
//   const response = await api.get(PET_BASE);
//   return response.data;
// };

// // Get all doctors
// export const getDoctors = async () => {
//   const response = await api.get(DOCTOR_BASE);
//   return response.data;
// };

// // Get doctor by ID
// export const getDoctorDetail = async (id) => {
//   const response = await api.get(`/api/doctors/${id}/`);
//   return response.data;
// };


// // Get all treatments
// export const getTreatments = async () => {
//   const response = await api.get(TREATMENT_BASE);
//   return response.data;
// };



// // ---------- Doctor Availability ----------

// // Get available slots for a doctor
// export const getDoctorAvailability = async (doctorId) => {
//   const response = await api.get(`/api/availability/doctor/${doctorId}/`);
//   return response.data;
// };


// // Book a slot
// export const bookSlot = async ({ slotId, petId, treatmentId }) => {
//   const response = await api.post(`/api/availability/book/`, {
//     slot_id: slotId,
//     pet_id: petId,
//     treatment_id: treatmentId
//   });
//   return response.data;
// };

import api from "./api"; // Axios instance

// ---------- Base Endpoints ----------
const APPOINTMENT_BASE = "/api/appointments/";
const PET_BASE = "/api/pets/";
const DOCTOR_BASE = "/api/doctors/";


// ---------- Appointments ----------

// Get all appointments
export const getAppointments = async () => {
  const response = await api.get(APPOINTMENT_BASE);
  return response.data;
};

// Get appointment detail
export const getAppointmentDetail = async (id) => {
  const response = await api.get(`${APPOINTMENT_BASE}${id}/`);
  return response.data;
};

// Create appointment (optional if you want manual creation)
export const createAppointment = async (appointmentData) => {
  const response = await api.post(APPOINTMENT_BASE, appointmentData);
  return response.data;
};

// ---------- Dropdown Data ----------

// Get all pets
export const getPets = async () => {
  const response = await api.get(PET_BASE);
  return response.data;
};

// Get all doctors
export const getDoctors = async () => {
  const response = await api.get(DOCTOR_BASE);
  return response.data;
};

// Get doctor detail
export const getDoctorDetail = async (id) => {
  const response = await api.get(`${DOCTOR_BASE}${id}/`);
  return response.data;
};

// ---------- Doctor Availability & Booking ----------

// Get available slots for a doctor
export const getDoctorAvailability = async (doctorId) => {
  const response = await api.get(`/api/availability/doctor/${doctorId}/`);
  return response.data;
};

// Book an appointment
// appointmentApi.js
export const bookSlot = async (formData) => {
  try {
    const response = await api.post("/api/availability/book/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    // Log full error
    console.error("API error:", err.response ? err.response.data : err.message);
    throw err;
  }
};

export const getUserPets = async () => {
  const response = await api.get(`${PET_BASE}?owner=true`);
  return response.data;
};