import { PiListThin, PiBagThin } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAppContext } from "../../context/AppContext";

import ModalContainer from "./ModalContainer";
import HeaderModal from "./HeaderModal";
import Logo from "../Helpers/Logo";

const navItems = [
  { link: "ITEMS", path: "/all-items" },
  { link: "FEATURES", path: "/features" },
  { link: "VISUAL", path: "/visual" },
];

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(200);
  const [visible, setVisible] = useState(true);
  const { cart } = useAppContext();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos && window.scrollY > 160) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{
            y: "-100%",
            opacity: 0,
          }}
          exit={{
            y: "-100%",
            opacity: 0,
          }}
          animate={{
            y: visible ? "0" : "-100%",
            opacity: 1,
          }}
          transition={{
            y: { duration: 0.8 },
          }}
          className="header"
        >
          {showModal && (
            <ModalContainer setShowModal={setShowModal} showModal={showModal}>
              <HeaderModal setShowModal={setShowModal} />
            </ModalContainer>
          )}

          <Logo />

          <ul className="header__nav-text">
            {navItems.map(({ link, path }) => (
              <li key={path}>
                <Link to={path} className="btn-text heading-3">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <div className="header__nav-icon">
            <PiListThin
              className="btn-text heading-3"
              size={30}
              onClick={() => setShowModal(!showModal)}
            />

            {cart.length ? (
              <Link to={"/cart"} className="header__cart">
                <PiBagThin size={30} className="btn-text heading-3" />
                <span className="header__cart-qty">{cart.length}</span>
              </Link>
            ) : (
              <Link to={"/cart"}>
                <PiBagThin size={30} className="btn-text heading-3" />
              </Link>
            )}
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
export default Header;
