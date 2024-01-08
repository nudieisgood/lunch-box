import { useLoaderData, useNavigate, Await, defer } from "react-router-dom";
import { useState, Suspense } from "react";
import { useAppContext } from "../../context/AppContext";
import customFetch from "../../utilities/customFetch";
import { LoadingLogo } from "../../components";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const res = customFetch.get(`items/${id}`);
    return defer({ item: res });
  } catch (error) {
    throw {
      status: error.response.status,
      message: error.response.data.msg,
    };
  }
};

const Item = () => {
  const [sizing, setSizing] = useState(false);
  const navigate = useNavigate();
  const loaderPromise = useLoaderData();

  const { cart, addToCart } = useAppContext();

  return (
    <Suspense fallback={<LoadingLogo />}>
      <Await resolve={loaderPromise.item}>
        {(loaderData) => {
          const item = loaderData.data.data;

          const {
            photos,
            name,
            type,
            price,
            description,
            fabric,
            _id,
            stock,
            status,
          } = item;

          const isSizeInCart = () =>
            cart
              .filter((item) => {
                return item.itemId === _id;
              })
              .map((i) => i.sizing)
              .includes(sizing);

          const handleSubmit = () => {
            if (!sizing) return;
            addToCart({ itemId: _id, sizing });
            navigate("/cart");
          };

          const isLowStock = () => {
            const qty = stock.filter((s) => s?.size === sizing)[0]?.quantity;
            if (qty !== 0 && qty <= 2) return true;
            return false;
          };

          return (
            <div className="item-page__bgc">
              <div className="item-page">
                <div className="item-page__imgs">
                  {photos.map((img, i) => (
                    <div key={i}>
                      <img src={img} className="item-page__img" alt="" />
                    </div>
                  ))}
                </div>

                <div className="item-page__content heading-4">
                  <h1 className="heading-1">{name}</h1>
                  <h4>$ {price} USD</h4>
                  {
                    <div className="item-page__size">
                      {stock?.map((s, i) => {
                        return (
                          <button
                            disabled={!s.quantity}
                            onClick={() => {
                              setSizing((pre) => s.size);
                            }}
                            key={i}
                            className={`item-page__size-btn ${
                              sizing === s.size && "item-page__size-btn--active"
                            }`}
                          >
                            {!s.quantity ? (
                              <h4 className="line-cross">{s.size}</h4>
                            ) : (
                              <h4>{s.size}</h4>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  }
                  {status === "coming soon" ? (
                    <button disabled className="item-page__btn opacity-md">
                      COMING SOON
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={
                        !sizing ||
                        isSizeInCart() ||
                        !stock
                          .map((s) => s.quantity)
                          .reduce((curr, acc) => curr + acc, 0)
                      }
                      className={`item-page__btn ${
                        (isSizeInCart() || !sizing) && "opacity-md"
                      }`}
                    >
                      {isLowStock() && (
                        <h4 className="item-page__lowstock">low stock</h4>
                      )}
                      {!stock
                        .map((s) => s.quantity)
                        .reduce((curr, acc) => curr + acc, 0)
                        ? "SOLD OUT"
                        : isSizeInCart()
                        ? "IN CART"
                        : "ADD TO CART"}
                    </button>
                  )}

                  <p className="heading-3">{description}</p>
                  <div className="break-line"></div>
                  <h4>fabric : {fabric}</h4>
                  <h4>
                    item type : {type}
                    {`${
                      stock[0]?.size === "ONE SIZE FITS ALL"
                        ? "(ONE SIZE FITS ALL)"
                        : ""
                    }`}
                  </h4>
                  {type === "pants" && (
                    <div>
                      <h4>SIZE GUIDE :</h4>
                      <h4>
                        SMALL(30W) / MEDIUM(32W )/ LARGE(34W) / XLARGE(36W)
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};
export default Item;
