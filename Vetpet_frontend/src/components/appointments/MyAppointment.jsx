import { useEffect, useState } from "react";
import { getAppointments } from "../../appointmentApi";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="alert alert-info">No appointments booked yet.</div>
      ) : (
        <div className="row">
          {appointments.map((app) => (
            <div key={app.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={
                    app.doctor.image
                      ? app.doctor.image.startsWith("http")
                        ? app.doctor.image
                        : `http://localhost:8001${app.doctor.image}`
                      : "/default-doctor.png"
                  }
                  className="card-img-top"
                  alt={app.doctor.name}
                  style={{ height: "200px", objectFit: "contain", borderTopLeftRadius: ".25rem", borderTopRightRadius: ".25rem" }}
                  onError={(e) => { e.currentTarget.src = "/default-doctor.png"; }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">Dr. {app.doctor.name}</h5>
                  <p className="text-muted mb-2">{app.doctor.specialty}</p>

                  <ul className="list-unstyled mb-3">
                    <li>
                      <strong>Appointment Date:</strong> {app.availability?.date}
                    </li>
                    <li>
                      <strong>Appointment Time:</strong> {app.availability?.start_time} - {app.availability?.end_time}
                    </li>
                    <li>
                      <strong>Pet:</strong> {app.pet.name} ({app.pet.species}, {app.pet.age} yrs)
                    </li>
                    <li>
                      <strong>Condition:</strong> {app.pet.condition || "N/A"}
                    </li>
                  </ul>

                  <span
                    className={`badge mt-auto ${
                      app.status === "Confirmed"
                        ? "bg-success"
                        : app.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
