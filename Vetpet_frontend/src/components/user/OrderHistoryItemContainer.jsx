import { useState } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const OrderHistoryItemContainer = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    if (expanded) {
      // If expanded (big page), go back to profile
      navigate(-1);
    } else {
      // If not expanded, go to big page
      navigate("/profile/order-history");
    }
    setExpanded(!expanded);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card" style={{ height: "300px" }}>
          <div
            className="card-header d-flex align-items-center"
            style={{ backgroundColor: "#6050DC", color: "white" }}
          >
            <div
              onClick={handleToggle}
              title={expanded ? "Minimize" : "Expand"}
              style={{
                cursor: "pointer",
                marginRight: "1rem",
              }}
            >
              {expanded ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
            </div>
            <h5>Order History</h5>
          </div>

          <div
            style={{
              height: "calc(300px - 56px)",
              overflowY: "auto",
              padding: "1rem",
            }}
          >
            <OrderHistoryItem />
            <OrderHistoryItem />
            <OrderHistoryItem />
            <OrderHistoryItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
