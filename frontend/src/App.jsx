import { React } from "react";
import { Form, Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/HomePage/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import MyAppointment from "./pages/Appointment/MyAppointment";
import Appointment from "./pages/Appointment/Appointment";
import Doctors from "./pages/Doctors/Doctors";
import MyProfile from "./pages/MyProfile/MyProfile";
import Footer from "./component/Footer";
import Services from "./pages/Services";
import DetailForm from "./pages/Form";
import Emergency from "./pages/Emergency";

const App = () => {
  return (
    <div className="mx-2 sm:mx-[2%]">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:DocId" element={<Appointment />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/services" element={<Services />} />
        <Route path="/form" element={<DetailForm />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
