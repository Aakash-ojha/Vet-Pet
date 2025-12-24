import { useNavigate } from "react-router-dom";
import DoctorImagePlaceholder from "./DoctorImagePlaceholder.jsx";

const RelatedDoctors = ({ doctors }) => {
  const navigate = useNavigate();

  if (!doctors || doctors.length === 0) return null;

  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5">
        <h3 className="fw-bold text-center mb-4">Similar Doctors</h3>
        <div className="row g-4">
          {doctors.map((doc) => (
            <div key={doc.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer", borderRadius: "12px" }}
                onClick={() => navigate(`/doctors/${doc.id}`)}
              >
                {doc.image ? (
                  <img
                    src={doc.image}
                    alt={doc.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                ) : (
                  <DoctorImagePlaceholder
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                )}
                <div className="card-body text-center">
                  <h5 className="fw-bold mb-1">Dr. {doc.name}</h5>
                  <p className="text-muted mb-1">{doc.specialty}</p>
                  <span
                    style={{
                      color: doc.is_available ? "green" : "red",
                      fontWeight: "500",
                    }}
                  >
                    {doc.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedDoctors;
