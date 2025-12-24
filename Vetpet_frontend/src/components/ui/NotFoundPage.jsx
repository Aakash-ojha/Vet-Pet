import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <header className="py-3  bg-info " style={{ marginBottom: "32vh" }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bold">Page Not Found!</h1>
          <p className="lead fw-normal text-white-75 mb-4">
            The page you're looking for does not exist.
          </p>
          <Link
            to="/shop"
            className="btn btn-light btn-lg rounded-pill px-4 py-2"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NotFoundPage;
