import React, { useEffect, useState } from "react";
import api, { BASE_URL } from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import image from "../../assets/Petshop1.jpg";
import { FaSearch } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("products/")
      .then((res) => {
        //console.log(res.data);
        setProducts(res.data);
        setLoading(false);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        //console.error(err.message);
        setError("Failed to load products.");
        toast.error("Failed to load products.");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  // For enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) return <p className="text-center mt-5">Loading products...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <section className="pb-5 ">
      {/* <div className="container  px-lg-5 "> */}
      <div
        className="  text-center text-white"
        style={{
          marginBottom: "80px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "60vh",
        }}
      >
        <div className="pt-5">
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontWeight: "bold" }}>
            Healthy Pets, Happy Homes
          </h1>

          <div
            style={{ fontFamily: "Merriweather, serif", fontSize: "1.1rem" }}
          >
            Best breed pets and top-quality medicines.
          </div>
          {/* Search button */}
          <div className="d-flex justify-content-center mt-5">
            <div className="position-relative" style={{ width: "320px" }}>
              <input
                type="text"
                className="form-control pe-5 rounded-pill"
                placeholder="Search your intrest..."
                // aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  height: "50px",
                  outline: "none",
                  borderColor: "none",
                  fontSize: "20px",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = "#ced4da";
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = "none";
                  e.target.style.borderColor = "#ced4da";
                }}
              />
              <FaSearch
                onClick={handleSearch}
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
                style={{ cursor: "pointer", fontSize: "20px" }}
              />
            </div>
          </div>
          {/* search button code ends */}
        </div>
      </div>
      <div className="container  px-lg-5 ">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {/* {products.map((product) => ( */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col mb-5" key={product.id}>
                <div className="card h-100">
                  {/* Product image */}
                  <img
                    className="card-img-top"
                    src={`${BASE_URL}${product.image}`}
                    alt={product.name}
                    style={{ height: "250px", objectFit: "cover" }}
                  />

                  {/* Product details */}
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{product.name}</h5>
                      <span className="ms-3">Rs</span>
                      <span className="ms-1">{product.price}</span>
                    </div>
                  </div>

                  {/* Product actions */}
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link
                        className="btn btn-outline-dark mt-auto"
                        to={`/products/${product.slug}`}
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;
