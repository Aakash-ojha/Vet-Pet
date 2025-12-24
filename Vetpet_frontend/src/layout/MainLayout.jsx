import NavBar from "../components/navbar/NavBar";
import Footer from "../components/ui/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";

const MainLayout = ({ numCartItems }) => {
  return (
    <>
      <NavBar numCartItems={numCartItems} />
      <ToastContainer />
      <div style={{ paddingTop: "78px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
