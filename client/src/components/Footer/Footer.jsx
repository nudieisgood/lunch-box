import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { AiOutlineFacebook } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppContext } from "../../context/AppContext";
import customFetch from "../../utilities/customFetch";
import Spinner from "../Helpers/Spinner";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, changeUser } = useAppContext();
  const adminLogin = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await customFetch.post("auth/login", {
        email: "admin@gmail.com",
        password: "admin1234",
      });
      changeUser(user);
      navigate("/admin");
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
    setLoading(false);
  };
  return (
    <div className="footer heading-3">
      <ul className="footer__links">
        <li>
          <Link className="header__modal-link" to={"/all-items"}>
            ALL ITEMS
          </Link>
        </li>
        <li>
          <Link className="header__modal-link" to={"/visual"}>
            VISUAL
          </Link>
        </li>
        <li>
          <Link className="header__modal-link" to={"/features"}>
            FEATURES
          </Link>
        </li>
      </ul>
      <ul className="footer__links">
        <li>
          <Link className="header__modal-link" to={"/"}>
            Shopping Guide
          </Link>
        </li>
        <li>
          <Link className="header__modal-link" to={"/"}>
            Terms
          </Link>
        </li>
        <li>
          <Link className="header__modal-link" to={"/"}>
            Policy
          </Link>
        </li>
        <li>
          <Link className="header__modal-link" to={"/"}>
            Customer Service
          </Link>
        </li>
      </ul>
      <div className="footer__links">
        <div className="footer__socials">
          <Link to={"/"}>
            <BsInstagram className="header__modal-link" size={25} />
          </Link>
          <Link to={"/"}>
            <AiOutlineFacebook className="header__modal-link" size={25} />
          </Link>
          <Link to={"/"}>
            <FiTwitter className="header__modal-link" size={25} />
          </Link>
        </div>

        <div className="footer__admin">
          {user?.role === "admin" ? (
            <Link to={"/admin"}>
              <span className="header__modal-link">ADMIN INTERFACE</span>
            </Link>
          ) : (
            <button type="type" disabled={loading} onClick={adminLogin}>
              {loading ? (
                <Spinner />
              ) : (
                <span className="header__modal-link">
                  LOG IN AS ADMIN (FOR DEMO)
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Footer;
