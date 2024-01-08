import { IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

const ModalContainer = ({ setShowModal, children }) => {
  const clickOutside = (e) => {
    e.target.classList.contains("modal__container") && setShowModal(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "linear",
          duration: 0.3,
        }}
        onClick={clickOutside}
        className="modal__container"
      >
        <motion.div className="modal__content-box">
          {children}
          <button
            className="modal__close btn-text "
            onClick={() => {
              setShowModal(false);
            }}
          >
            <IoCloseOutline size={40} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ModalContainer;
