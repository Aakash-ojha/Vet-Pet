import { useEffect, useState } from "react";
import ProductPagePlaceHolder from "./ProductPagePlaceHolder";
import RelatedProducts from "./RelatedProducts";
import { useParams } from "react-router-dom";
import api from "../../api";
import { BASE_URL } from "../../api";
import { toast } from "react-toastify";

const ProductPage = ({ setNumberCartItems }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const cart_code = localStorage.getItem("cart_code");

  useEffect(
    function () {
      if (product.id) {
        api
          .get(
            `product_in_cart?cart_code=${cart_code}&product_id=${product.id}`
          )
          .then((res) => {
            console.log(res.data);
            setInCart(res.data.product_in_cart);
          })

          .catch((err) => {
            console.log(err.message);
          });
      }
    },
    [cart_code, product.id]
  );

  const newItem = { cart_code: cart_code, product_id: product.id };

  function add_item() {
    // const newItem = { cart_code: cart_code, product_id: product.id };

    api
      .post("add_item/", newItem)
      .then((res) => {
        console.log(res.data);
        setInCart(true);
        toast.success("Product added to cart", {
          autoClose: 3000,
          pauseOnHover: false,
        });
        setNumberCartItems((curr) => curr + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(
    function () {
      setLoading(true);
      api
        .get(`product_detail/${slug}`)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data.product);
          setSimilarProducts(res.data.similar_products);

          console.log("Related products:", res.data.similar_products);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    },
    [slug]
  );

  if (loading) return <ProductPagePlaceHolder />;
  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`${BASE_URL}${product.image}`}
                alt={product.name || "Product Image"}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1"></div>
              <h1 className="display-5 fw-bolder">{product.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">{`Rs${
                  Number(product.price) + 1000
                }`}</span>

                <span className="ms-2"> Rs{product.price}</span>
              </div>
              <p className="lead">{product.description}</p>
              <div className="d-flex">
                {/*must be needed,so donot delete it */}
                {/* <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  value="1"
                  style={{ maxWidth: "3rem" }}
                /> */}
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={add_item}
                  disabled={inCart}
                >
                  <i className="bi-cart-fill me-1"></i>
                  {inCart ? "Product added to cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts products={similarProducts} />
    </div>
  );
};

export default ProductPage;
