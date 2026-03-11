import NavBar from "../components/navbar/NavBar";
import Footer from "../components/ui/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";

const MainLayout = ({ numCartItems }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar numCartItems={numCartItems} />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={false}
        limit={3}
        style={{ width: "auto", maxWidth: "320px" }}
      />

      <main style={{ flex: 1, paddingTop: "70px" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
