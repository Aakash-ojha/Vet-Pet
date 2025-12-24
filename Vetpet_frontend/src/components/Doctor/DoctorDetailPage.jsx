import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorDetail, getDoctorAvailability } from "../../appointmentApi.js";
import DoctorImagePlaceholder from "./DoctorImagePlaceholder.jsx";
import RelatedDoctors from "./RelatedDoctors.jsx";

const SLOT_DURATION_MINUTES = 30;
const DAYS_TO_SHOW = 7;

const formatDateToISO = (date) => date.toISOString().split("T")[0];

const generateNext7Days = () =>
  Array.from({ length: DAYS_TO_SHOW }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

const parseTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

const roundToNextSlotInterval = (minutes, interval = SLOT_DURATION_MINUTES) =>
  Math.ceil(minutes / interval) * interval;

const createDateWithTime = (date, hours, minutes) => {
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};

const isSlotInPast = (selectedDay, slotEnd) => {
  const now = new Date();
  return selectedDay.toDateString() === now.toDateString() && slotEnd <= now;
};

const generate30MinuteSlots = (slots, selectedDay) => {
  if (!slots.length) return [];
  const dayStr = formatDateToISO(selectedDay);
  const daySlots = slots.filter((slot) => slot.date === dayStr);
  const generatedSlots = [];

  daySlots.forEach((slot) => {
    const startMinutes = parseTimeToMinutes(slot.start_time);
    const endMinutes = parseTimeToMinutes(slot.end_time);
    const roundedStartMinutes = roundToNextSlotInterval(startMinutes);

    const startHour = Math.floor(roundedStartMinutes / 60);
    const startMinute = roundedStartMinutes % 60;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    let start = createDateWithTime(selectedDay, startHour, startMinute);
    const end = createDateWithTime(selectedDay, endHour, endMinute);

    while (start < end) {
      const slotEnd = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60000);
      if (slotEnd > end) break;

      generatedSlots.push({
        ...slot,
        start_time: start.toTimeString().slice(0, 5),
        end_time: slotEnd.toTimeString().slice(0, 5),
        is_disabled: slot.is_booked || isSlotInPast(selectedDay, slotEnd),
      });

      start = slotEnd;
    }
  });

  return generatedSlots;
};

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const weekDays = useMemo(() => generateNext7Days(), []);
  const generatedSlots = useMemo(
    () => generate30MinuteSlots(slots, selectedDay),
    [slots, selectedDay]
  );

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const data = await getDoctorDetail(id);
        if (!data?.id) return;

        setDoctor(data);
        setRelatedDoctors(data.similar_doctors || []);
        const slotsData = await getDoctorAvailability(data.id);
        setSlots(slotsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctorData();
  }, [id]);

  useEffect(() => setSelectedSlot(null), [selectedDay]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleProceedToAppointment = () => {
    if (!selectedSlot) return;
    navigate("/appointment", {
      state: {
        doctor,
        slot: selectedSlot,
      },
    });
  };

  if (!doctor) return <p className="text-center mt-5">Loading doctor details...</p>;

  return (
    <div style={{ backgroundColor: "#f7faff", minHeight: "100vh" }}>
      <div className="container py-4">
        {/* Doctor Info */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              {doctor.image ? (
                <img
                  src={doctor.image?.startsWith("http") ? doctor.image : `http://localhost:8001${doctor.image}`}
                  alt={doctor.name}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  style={{
                    width: "200px",
                    height: "240px",
                    borderRadius: "15px",
                    objectFit: "cover",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              ) : (
                <DoctorImagePlaceholder style={{ width: "200px", height: "240px" }} />
              )}
            </div>
            <div className="col-md-8">
              <h2 className="fw-bold mb-1">{doctor.name}</h2>
              <p className="text-muted mb-3">{doctor.specialty}</p>
              <p className="fw-semibold">Fee: ${doctor.consultation_fee || 50}</p>
            </div>
          </div>
        </div>

        {/* Select Day */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <h5 className="fw-bold mb-3">Select Appointment Day</h5>
          <div className="d-flex gap-2 overflow-auto pb-3">
            {weekDays.map((day) => {
              const isSelected = day.toDateString() === selectedDay.toDateString();
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className="btn rounded-4"
                  style={{
                    width: "90px",
                    height: "90px",
                    flexShrink: 0,
                    background: isSelected ? "#4facfe" : "#fff",
                    color: isSelected ? "#fff" : "#333",
                    border: isSelected ? "none" : "1px solid #dee2e6",
                  }}
                >
                  <div style={{ fontSize: "0.8rem" }}>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{day.getDate()}</div>
                  <div style={{ fontSize: "0.75rem" }}>{day.toLocaleDateString("en-US", { month: "short" })}</div>
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          <h5 className="fw-bold mt-3 mb-2">Available Time Slots</h5>
          <div className="d-flex gap-2 overflow-auto pb-3">
            {generatedSlots.length > 0 ? (
              generatedSlots.map((slot, idx) => {
                const isSelected = selectedSlot?.start_time === slot.start_time;
                return (
                  <button
                    key={idx}
                    onClick={() => !slot.is_disabled && handleSelectSlot(slot)}
                    disabled={slot.is_disabled}
                    className="btn rounded-pill"
                    style={{
                      minWidth: "110px",
                      height: "45px",
                      background: isSelected ? "#4facfe" : "#fff",
                      color: isSelected ? "#fff" : slot.is_disabled ? "#adb5bd" : "#495057",
                      border: isSelected ? "none" : "1px solid #dee2e6",
                    }}
                  >
                    {slot.start_time}
                  </button>
                );
              })
            ) : (
              <p className="text-muted">No available slots for this date</p>
            )}
          </div>

          <button
            onClick={handleProceedToAppointment}
            disabled={!selectedSlot}
            className="btn btn-lg w-100 mt-3"
            style={{
              background: selectedSlot ? "#4facfe" : "#282249a6",
              color: "white",
              borderRadius: "40px",
              fontWeight: "600",
            }}
          >
            Select Time
          </button>
        </div>

        {/* Related Doctors */}
        {relatedDoctors.length > 0 && (
          <div className="mt-5">
            <h4 className="fw-bold mb-3">Similar Doctors</h4>
            <RelatedDoctors doctors={relatedDoctors} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailPage;
