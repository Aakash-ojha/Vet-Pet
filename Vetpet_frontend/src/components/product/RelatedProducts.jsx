import React from "react";
import HomeCard from "../home/HomeCard";

const RelatedProducts = ({ products }) => {
  return (
    <section className="py-3 bg-light">
      <div className="container px-4 px-lg-5 mt-3">
        <h2 className="fw-bolder mb-4">Related products</h2>

        {products.length === 0 ? (
          <p
            style={{
              fontSize: "1.5rem",
              color: "#555",
              textAlign: "center",
              padding: "3rem 0",
              fontWeight: "600",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            No related products.
          </p>
        ) : (
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product) => (
              <HomeCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
