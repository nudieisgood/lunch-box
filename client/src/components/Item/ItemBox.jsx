import { useState } from "react";
import { Link } from "react-router-dom";

import customFetch from "../../utilities/customFetch";
import PillBtn from "../Helpers/PillBtn";

const ItemBox = ({ item, user }) => {
  const [available, setAvailable] = useState(item.isAvailable);

  const activeItem = async (id) => {
    try {
      setAvailable(!available);
      await customFetch.put(`items/${id}`);
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
  };

  const totalStock = () => {
    return item?.stock
      .map((s) => s.quantity)
      ?.reduce((curr, acc) => curr + acc, 0);
  };

  return (
    <div className="items-page__item" key={item._id}>
      {user?.role === "admin" && (
        <div className="items-page__admin">
          <Link
            to={`/admin/editItem/${item._id}`}
            className="items-page__admin-edit heading-4"
          >
            EDIT ITEM
          </Link>

          <PillBtn
            available={available}
            activeItem={() => {
              activeItem(item._id);
            }}
          />
        </div>
      )}
      <Link to={`/item/${item._id}`} className={available ? "" : "opacity-md"}>
        <img src={item.photos[0]} alt="" />
        <p className="heading-4 items-page__item-name">{item.name}</p>

        <div className="items-page__item-back">
          <img src={item.photos[item.photos.length - 1]} alt="" />
        </div>
        {!totalStock() && (
          <p className="items-page__item-status heading-3">SOLD OUT</p>
        )}
        {item.status === "coming soon" && (
          <p className="items-page__item-status heading-3">COMING SOON</p>
        )}
      </Link>
    </div>
  );
};

export default ItemBox;
