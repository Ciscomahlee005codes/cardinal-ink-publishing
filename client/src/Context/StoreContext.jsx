import { createContext, useState } from "react";
import { books_store } from "../../library_list";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   const [cartItems, setCartItems] = useState({});

   const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = books_store.find(
        (product) => product.id === Number(item)
      );
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
};


    const contextValue = {
    books_store,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };
    return (
       <StoreContext.Provider value={contextValue}>
         {props.children}
       </StoreContext.Provider>
     );
};

export default StoreContextProvider