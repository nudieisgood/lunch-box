import { PiBagThin } from "react-icons/pi";

import { Link, useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";

const links = [
  { link: "all items", path: "/all-items" },
  { link: "jacket", path: "/all-items?typeFilter=jacket" },
  { link: "shirt", path: "/all-items?typeFilter=shirt" },
  { link: "pants", path: "/all-items?typeFilter=pants" },
  { link: "top", path: "/all-items?typeFilter=top" },
  { link: "hat", path: "/all-items?typeFilter=hat" },
  { link: "accessory", path: "/all-items?typeFilter=accessory" },
];

const HeaderModal = ({ setShowModal }) => {
  const { user, logout, cart } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="header__modal">
      <ul className="header__modal-nav">
        {links.map((link) => (
          <li key={link.link} className="header__modal-item">
            <Link
              className="header__modal-link"
              onClick={() => {
                setShowModal(false);
              }}
              to={link.path}
            >
              {link.link}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="header__modal-nav">
        <li className="header__modal-item">
          <Link
            className="header__modal-link"
            onClick={() => {
              setShowModal(false);
            }}
            to={"/features"}
          >
            FEATURES
          </Link>
        </li>
        <li className="header__modal-item">
          <Link
            className="header__modal-link"
            onClick={() => {
              setShowModal(false);
            }}
            to={"/visual"}
          >
            VISUAL
          </Link>
        </li>
      </ul>
      <div className="header__modal-btns">
        <div>
          {cart.length ? (
            <Link to={"/cart"} className="header__cart header__cart--white">
              <PiBagThin size={30} className="btn-text" />
              <span className="header__cart-qty">{cart.length}</span>
            </Link>
          ) : (
            <Link to={"/cart"}>
              <PiBagThin size={30} className="btn-text" />
            </Link>
          )}
        </div>
        <Link
          to="/register"
          className="btn btn--white"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Sign up
        </Link>

        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
              setShowModal(false);
            }}
            className="btn btn--white"
          >
            Log out
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => {
              setShowModal(false);
            }}
            className="btn btn--white"
          >
            Login in
          </Link>
        )}
      </div>
    </div>
  );
};
export default HeaderModal;
