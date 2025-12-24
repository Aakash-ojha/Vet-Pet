import React from "react";

function ContactUs() {
  return (
    <div
      className="d-flex justify-content-center mt-5 "
      style={{ marginBottom: "14vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
      >
        <h1 className="text-center mb-4">Contact Us</h1>

        <p style={{ fontFamily: "sans-serif", textAlign: "center" }}>
          At VetPet, we're always ready to help you and your pets. If you have
          any questions, need support, or want to reach out for services like
          buying a pet, booking an appointment, or grooming, you can contact us
          anytime. You can reach us by phone, and our team is available to
          assist you 24/7.
        </p>

        <div className="text-center mt-4" style={{ lineHeight: "2" }}>
          <h6>📱 98XXXXXXXX</h6>
          <h6>☏ 056-XXXXX</h6>
          <h6>🌐 vetpet.com</h6>
          <h6>𝐟 VetPet</h6>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
