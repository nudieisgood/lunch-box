import { useAppContext } from "../../context/AppContext";
import { BsTrash3 } from "react-icons/bs";
import { useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../utilities/customFetch";
import { useState } from "react";

import { Spinner } from "../../components";

export const loader = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || !cart.length) return { msg: "Your cart is empty" };
  const cartItems = Object.values(cart.map((c) => c.itemId));

  try {
    const res = await customFetch.get("items", {
      params: { cartItemsId: cartItems },
    });

    return cart.map((c) => {
      const itemInfo = res.data.data.filter((item) => item._id === c.itemId)[0];
      return { ...c, itemInfo };
    });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Cart = () => {
  const cartItems = useLoaderData();
  const navigate = useNavigate();
  const { cart, removeFromCart } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkStockArr = [];
  const checkAvailableArr = [];
  const priceArr = [];

  const checkout = async () => {
    setIsSubmitting(true);
    try {
      const res = await customFetch.post("checkout", cart);
      setIsSubmitting(false);
      navigate(`/checkout?c=${res.data.token}`);
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
  };

  const removeItem = (id, size) => {
    setLoading(true);
    removeFromCart({ itemId: id, sizing: size });
    navigate("/cart");
    setLoading(false);
  };

  if (cartItems.msg)
    return (
      <div className="center-empty-page">
        <div className="center-empty-page__box">
          <h1 className="section-title">CART</h1>
          <h2 className="heading-2">{cartItems.msg}</h2>
        </div>
      </div>
    );

  return (
    <div className="page-container cart">
      <h1 className="section-title">CART</h1>

      <div className="center-xy">
        <p className="heading-3">Purchase Restrictions Announcement</p>
        <p className="heading-4">
          Purchases are limited to one, per color, per size
        </p>
      </div>

      <div className="cart__items-container">
        <div className="heading-4 cart__items cart__items--header">
          <h4>ITEM</h4>
          <h4></h4>
          <h4>QUANTITY</h4>
          <h4>PRICE</h4>
        </div>

        {cartItems?.map((c, i) => {
          const { name, photos, price, stock, isAvailable } = c.itemInfo;

          const stockQty = stock.filter((st) => st.size === c.sizing)[0]
            .quantity;

          if (stockQty === 0) checkStockArr.push(stockQty);
          if (!isAvailable) checkStockArr.push(isAvailable);
          priceArr.push(price);

          return (
            <div key={i} className="cart__items cart__items--body">
              <img src={photos[0]} alt="cart photo" />

              <div className="cart__item-detail heading-3">
                <h4 className="heading-4">{name}</h4>
                <h3>$ {price} USD</h3>
                <h3>SIZE: {c.sizing}</h3>
              </div>
              <div className="cart__item-qty heading-4">
                <div className="cart__item-qty-box">1</div>
                <h4 className="cart__warning">{!stockQty && "OUT OF STOCK"}</h4>
                <h4 className="cart__warning">
                  {!isAvailable && "UNAVAILABLE"}
                </h4>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    removeItem(c.itemId, c.sizing);
                  }}
                >
                  {loading ? <Spinner /> : <BsTrash3 size={15} />}
                </button>
              </div>
              <div className="heading-3">$ {price * 1} USD</div>
            </div>
          );
        })}
      </div>

      <div className="cart__price">
        <h2 className="heading-2">
          TOTAL PRICE : $ {priceArr.reduce((acc, curr) => acc + curr, 0)}
          USD
        </h2>
        <h4 className="heading-4">
          Tax included and shipping calculated at checkout
        </h4>
        <h4 className="heading-4 cart__warning">
          {checkStockArr.length > 0 &&
            "Please remove items that are out of stock before checkout."}
          {checkAvailableArr.length > 0 &&
            "Please remove items that are unavailable before checkout."}
        </h4>
        <button
          disabled={isSubmitting || checkStockArr.length > 0}
          onClick={checkout}
          className={`btn-form ${checkStockArr.length > 0 && "opacity-md"}`}
        >
          {isSubmitting ? <Spinner /> : "CHECK OUT"}
        </button>
      </div>
    </div>
  );
};
export default Cart;
