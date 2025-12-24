import React, { useEffect, useState } from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import api from "../../api";
import PlaceHolderContainer from "../ui/PlaceHolderContainer";
import Error from "../ui/Error";
import { randomValue } from "../../GenerateCardCode";
// import whyVetpet from "../ui/whyVetpet";
import image from "../../assets/whyvetpet.png";
import dogImage from "../../assets/dog.png";
import MobileNav from "../navbar/MobileNav";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("cart_code") == null) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setProducts(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <>
      {/* <MobileNav /> */}
      <Header />

      {/* Changed section */}

      <div className="container mb-5 " style={{ marginTop: "8rem" }}>
        <div className="row justify-content-center g-5">
          <div className="col-md-5 text-center mt-4 mt-md-0">
            <img
              src={dogImage}
              alt="VetPet"
              className="img-fluid rounded shadow-sm img-fluid border-0"
              style={{
                maxHeight: "600px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-7 ">
            <h1 className="fw-bold mb-4">
              Why Choose
              <span> Vetpet</span>
            </h1>

            <p style={{ fontFamily: "Poppins, sans-serif ", fontSize: "17px" }}>
              VetPet connects pet owners with top-tier veterinarians nationwide.
              With our extensive Vet Clinic Directory, Access to Specialist,
              Appointment Scheduling, and Buy pets online. VetPet can provide
              you and your pet with Flexible & Expert Care.
            </p>

            <ul className="list-styled mt-4 ">
              <li className="mb-3">
                <h5 className="fw-bold">To buy pets</h5>
                <p>
                  VetPet is the best place to buy pets because it provides a
                  safe and trusted platform for pet lovers.Every pet listed on
                  VetPet is healthy, and well cared for, ensuring you find a
                  happy and genuine companion.Choosing VetPet means choosing
                  safety, trust, and happiness for both you and your pet.
                </p>
              </li>

              <li className="mb-3">
                <h5 className="fw-bold">To take Appointments</h5>
                <p>
                  VetPet is the easiest and most reliable way to book veterinary
                  appointments online. It helps pet owners connect directly with
                  qualified and experienced vets without the hassle of waiting
                  in long lines or making repeated phone calls. Through VetPet,
                  you can schedule appointments at your preferred time.
                </p>
                <a
                  className="btn btn-info btn-lg rounded-pill px-4 py-2 text-white mt-3"
                  href="/about"
                >
                  Learn More
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next section */}
      <div className="bg-light py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold fs-2">Services</h1>
          <p className="mt-3 mb-0">
            Empower your pet care journey with our comprehensive suite of <br />
            services designed to support you and your furry companion.
          </p>
        </div>

        {/* Card Section */}
        <div className="d-flex flex-wrap justify-content-evenly align-items-stretch px-3 ">
          {/* Card 1 */}
          <div
            className="card bg-light border rounded-4 p-3 shadow-sm d-flex flex-column mb-3"
            style={{
              width: "20rem",
              cursor: "pointer",
              transition: "all 0.1s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-6px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body text-center d-flex flex-column flex-grow-1">
              <h5 className="card-title fw-semibold mb-3">Buy Your Pet</h5>
              <p className="card-text flex-grow-1 text-start">
                We have a trusted and caring platform where you can easily buy
                healthy and verified pets. At VetPet, we provide a wide range of
                pets-from playful puppies to adorable kittens-all checked and
                approved by professionals. We make the buying process simple,
                safe, and transparent so you can find your perfect companion
                without any worries.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="card bg-light border rounded-4 p-3 shadow-sm d-flex flex-column mb-3"
            style={{
              width: "20rem",
              cursor: "pointer",
              transition: "all 0.1s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-6px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body text-center d-flex flex-column flex-grow-1">
              <h5 className="card-title fw-semibold mb-3">Pet Grooming</h5>
              <p className="card-text flex-grow-1 text-start">
                We have professional grooming services to keep your pets clean,
                healthy, and happy. At VetPet, we provide expert care that
                includes bathing, trimming, nail clipping, and styling-all done
                in a safe and comfortable environment. We use pet-friendly
                products and modern tools to ensure your furry friend looks and
                feels their best.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="card bg-light border rounded-4 p-3 shadow-sm d-flex flex-column "
            style={{
              width: "20rem",
              cursor: "pointer",
              transition: "all 0.1s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-6px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div className="card-body text-center d-flex flex-column flex-grow-1">
              <h5 className="card-title fw-semibold mb-3">
                Take Appointments for pets
              </h5>
              <p className="card-text flex-grow-1 text-start">
                We have an easy and reliable appointment system that helps you
                connect with professional vets quickly. At VetPet, we provide a
                simple way to book veterinary appointments online without
                waiting or making phone calls. You can choose your preferred
                doctor, date, and time with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd section */}
      <div className=" p-4 rounded-3 my-5">
        {/* Header Section */}
        <div className="text-center " style={{ marginBottom: "5rem" }}>
          <div className="h2 mb-3">Discover the Process</div>
          <div>
            Experience a seamless consultation journey - VetPet makes it
            effortless and efficient.
          </div>
        </div>
        <br />
        <br />

        {/* Steps Section */}
        <div
          className="d-flex justify-content-center align-items-start flex-wrap"
          style={{ gap: "10rem" }}
        >
          {/* Steps List */}
          <ul className="list-unstyled">
            <li className="mb-3">
              <span className="bg-info text-white rounded-circle px-2 py-1 me-2">
                1
              </span>
              <span className="fs-5 fw-semibold">Create Your Profile</span>
              <div className="ms-4 mt-1">
                Provide essential details about your pet to receive <br />
                personalized services.
              </div>
            </li>

            <li className="mb-3">
              <span className="bg-info text-white rounded-circle px-2 py-1 me-2">
                2
              </span>
              <span className="fs-5 fw-semibold">Buy Your Pets</span>
              <div className="ms-4 mt-1">
                Provide healthy and best breed pets.
              </div>
            </li>

            <li style={{ marginBottom: "3rem" }}>
              <span className="bg-info text-white rounded-circle px-2 py-1 me-2">
                3
              </span>
              <span className="fs-5 fw-semibold">Schedule an Appointment</span>
              <div className="ms-4 mt-1 mb-2">
                Book a convenient time for either an in-person visit <br />
                or an online consultation.
              </div>
            </li>

            <div className="ms-4 ">
              <a
                className="btn btn-info btn-lg rounded-pill px-4 py-2 text-white"
                href="/doctors"
              >
                Get Your Appointment
              </a>
            </div>
          </ul>

          {/* Image Section */}
          <div>
            <img src={image} alt="Pet" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
