import { createContext, useState } from "react";
import useBooks from "../Hooks/useBooks";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   const {bookCollection} = useBooks()
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
      let itemInfo = bookCollection.find(
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
    bookCollection,
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