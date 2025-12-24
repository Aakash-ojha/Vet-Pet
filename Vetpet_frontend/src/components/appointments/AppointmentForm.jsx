import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookSlot } from "../../appointmentApi.js";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, slot, pet } = location.state || {};

  const [selectedAnimalType, setSelectedAnimalType] = useState(pet?.type || "");
  const [animalName, setAnimalName] = useState(pet?.name || "");
  const [animalAge, setAnimalAge] = useState(pet?.age || "");
  const [animalCondition, setAnimalCondition] = useState(pet?.condition || "");
  const [animalImage, setAnimalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!doctor || !slot) {
      navigate("/");
    }
  }, [doctor, slot, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAnimalType) return alert("Please select animal type");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("doctor_id", doctor.id);
      formData.append("slot_id", slot.id);
      formData.append("pet_type", selectedAnimalType);
      formData.append("pet_name", animalName);
      formData.append("pet_age", animalAge);
      formData.append("pet_condition", animalCondition);
      if (animalImage) formData.append("pet_image", animalImage);


       console.log("All Form Data Pairs:");
      for (const [key, value] of formData.entries()) {
      console.log(key, ":", value);
      }

      await bookSlot(formData, true);
      setSuccess(true);
      navigate("/my-appointments");
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor || !slot) return null;

  if (success)
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-sm p-4">
          <h3 className="text-success mb-3">Appointment Booked Successfully!</h3>
          <p>
            Dr. {doctor.name} on {slot.start_time} ({slot.date})
          </p>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="container py-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="card shadow-sm rounded-4 p-5 w-100"
        style={{ maxWidth: "600px" }}
      >
        <h3 className="mb-4 text-center">Book Appointment</h3>

        {/* Doctor & Slot Details */}
        <section className="mb-4">
          <div className="mb-3">
            <label className="form-label">Doctor Name</label>
            <input type="text" className="form-control" value={`Dr. ${doctor.name}`} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Specialty</label>
            <input type="text" className="form-control" value={doctor.specialty} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="text" className="form-control" value={slot.date} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Time</label>
            <input type="text" className="form-control" value={`${slot.start_time} - ${slot.end_time}`} disabled />
          </div>
        </section>

        <hr />

        {/* Animal Details */}
        <section className="mb-4">
          <h5 className="mb-3">Animal Details</h5>

          <div className="mb-3">
            <label className="form-label">Animal Type</label>
            <select
              className="form-select"
              value={selectedAnimalType}
              onChange={(e) => setSelectedAnimalType(e.target.value)}
              disabled={!!pet}
            >
              <option value="">-- Choose Animal --</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hen">Hen</option>
              <option value="small_animal">Small Animal</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Animal Name</label>
            <input
              type="text"
              className="form-control"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              disabled={!!pet}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Animal Age (years)</label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={animalAge}
              onChange={(e) => setAnimalAge(e.target.value)}
              disabled={!!pet}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Animal Image</label>
            {pet?.image ? (
              <div className="mb-2">
                <img
                  src={pet.image}
                  alt="Animal"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: "150px" }}
                />
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setAnimalImage(e.target.files[0])}
                disabled={!!pet}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Animal Condition / Notes</label>
            <textarea
              className="form-control"
              value={animalCondition}
              onChange={(e) => setAnimalCondition(e.target.value)}
              disabled={!!pet}
              rows={3}
            />
          </div>
        </section>

        {/* Fee */}
        <section className="mb-4">
          <label className="form-label">Fee</label>
          <input type="text" className="form-control fw-bold" value={`$${doctor.consultation_fee || 50}`} disabled />
        </section>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
