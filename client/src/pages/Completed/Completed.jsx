import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const Completed = () => {
  const { setCart } = useAppContext();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
  }, []);

  return (
    <div className="center-empty-page">
      <div className="center-empty-page__box">
        <h1 className="section-title">CONTRAS</h1>
        <p className="paragraph">
          Your order has been confirmed, if there's any lack of items we will
          send you a notification email, if not, after we ship your order. you
          will receive email of shipping memo which can track delivery status.
        </p>
      </div>
    </div>
  );
};
export default Completed;
