import { createContext, useContext, useState, useEffect } from "react";
import customFetch from "../utilities/customFetch";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);

  const changeUser = (newUser) => {
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await customFetch("/auth/logout");
      changeUser(null);
    } catch (error) {
      throw {
        status: error.response.status,
        message: error.response.data.msg,
      };
    }
  };

  const removeFromCart = ({ itemId, sizing }) => {
    const filterCart = cart.filter((c) => {
      return c.itemId !== itemId;
    });

    const targetItems = cart.filter((c) => {
      return c.itemId === itemId;
    });

    const finalCart = [
      ...filterCart,
      ...targetItems.filter((c) => c.sizing !== sizing),
    ];

    localStorage.setItem("cart", JSON.stringify(finalCart));
    setCart(finalCart);
  };

  const addToCart = (newItem) => {
    if (!cart.length) {
      setCart([...cart, newItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    } else {
      const isSameItem = cart
        .map((item) => {
          if (item.itemId === newItem.itemId && item.sizing === newItem.sizing)
            return true;
          return false;
        })
        .includes(true);

      if (isSameItem) return;

      setCart([...cart, newItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
    }
  };

  const getUserInfo = async () => {
    try {
      const data = await customFetch.get("/user/get-current-user");
      setUser(data.data.user);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!user) {
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    const jsonCart = JSON.parse(localStorage.getItem("cart"));
    if (!jsonCart) return;
    setCart(jsonCart);
  }, []);

  const contextValue = {
    user,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    changeUser,
    logout,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
