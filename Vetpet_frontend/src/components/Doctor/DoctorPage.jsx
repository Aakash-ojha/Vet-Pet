import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../../appointmentApi.js";
import DoctorImagePlaceholder from "./DoctorImagePlaceholder.jsx";

const cardStyle = {
  padding:'2px',
  backgroundColor: "#f5faff",
  borderRadius: "12px",
  border: "1px solid #d0e4ff",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  display: "flex",
  flexDirection: "column",
  height: "380px", // fixed height for all cards
};

const cardHoverStyle = {
  transform: "translateY(-6px)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
};

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDoctors()
      .then((data) => {
        setDoctors(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading doctors...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-5 fw-bold text-center">Our Doctors</h2>
      {doctors.length === 0 ? (
        <p className="text-center">No doctors available.</p>
      ) : (
        <div className="row g-4">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              onClick={() => navigate(`/doctors/${doctor.id}`)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                style={{
                  ...cardStyle,
                  ...(hoveredCard === index ? cardHoverStyle : {}),
                }}
              >
                {/* Image / Placeholder */}
                <div
                  style={{
                    flex: "0 0 220px", // fixed image height
                    overflow: "hidden",
                    borderRadius: "12px 12px 0 0",
                    backgroundColor: "#e6f0ff",
                    display: "flex",             // ✅ add flex
                    justifyContent: "center",    // ✅ horizontal center
                    alignItems: "center",        // ✅ vertical center
                   
                  }}
                >
                  {doctor.image ? (
                    <img
                      src={
                          doctor.image.startsWith("http") 
                             ? doctor.image 
                             : `http://localhost:8001${doctor.image}` // replace with your backend URL
                            }
                            alt={doctor.name}
                      style={{
                      maxWidth: "100%",      
                      maxHeight: "100%",        
                      objectFit: "cover",       
                      borderRadius: "12px 12px 0 0",
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <DoctorImagePlaceholder
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px 12px 0 0",
                        backgroundColor: "#e6f0ff",
                        objectFit: "cover", 
                      }}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div
                  style={{
                    flex: "1 1 auto",
                    padding: "12px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginTop:'10px'
                  }}
                >
                  <p
                    style={{
                      color: "green",
                      fontWeight: "500",
                      fontSize: "0.9rem",
                      marginBottom: "4px",
                      marginTop: 0,
                    }}
                  >
                   {doctor.is_available ? "Available" : "Unavailable"}
                  </p>
                  <h5
                    style={{
                      fontWeight: "700",
                      marginBottom: "4px",
                      marginTop: 0,
                      flexShrink: 0,
                    }}
                  >
                    Dr. {doctor.name}
                  </h5>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.9rem",
                      margin: 0,
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2, // max 2 lines for speciality
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {doctor.specialty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
