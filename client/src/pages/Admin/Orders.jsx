import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import customFetch from "../../utilities/customFetch";

export const loader = async () => {
  try {
    const res = await customFetch.get("order/orders");

    return res.data.data;
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

export const action = async () => {
  return null;
};

const Orders = () => {
  const orders = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (orderId, status) => {
    setLoading(true);
    try {
      await customFetch.patch(`order/${orderId}`, { status: status });
      navigate(".");
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
    setLoading(false);
  };

  return (
    <div className="admin__order mt-sm">
      {orders.map((order) => (
        <div key={order._id} className="admin__order-card">
          <div className="admin__order-card--left">
            <h2 className="heading-2">ORDER NO. {order._id}</h2>
            <div>
              <h2 className="heading-2">SHIPPING INFO :</h2>
              <div className="admin__order-card--info">
                <p>CITY : {order.city}</p>
                <p>POSTAL CODE : {order.postalCode}</p>
                <p>ADDRESS : {order.address}</p>
                <p>PHONE : {order.phone}</p>
              </div>
            </div>
            <div>
              <h2 className="heading-2">ITEMS INFO :</h2>
              <div className="admin__order-card--info">
                {order.items.map((o) => (
                  <div key={o._id}>
                    <p>ITEM NO. {o.itemId}</p>
                    <p>SIZE : {o.sizing} - QTY 1</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin__order-card--right">
            {order.status === "pending" && (
              <div>
                <button
                  disabled={loading}
                  onClick={() => {
                    handleClick(order._id, "shipped");
                  }}
                  className="btn-form"
                >
                  {loading ? <Spinner /> : "Order Shipped"}
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    handleClick(order._id, "cancel");
                  }}
                  className="btn-form btn-form--cancel"
                >
                  {loading ? <Spinner /> : " Cancel this order"}
                </button>
              </div>
            )}
            <h2 className="heading-2">Status : {order.status}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Orders;
