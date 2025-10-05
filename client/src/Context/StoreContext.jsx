import { createContext, useState, useEffect } from "react";
import endPoint from "../API/Interface"; // ✅ Fetch directly here instead of custom hook

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [bookCollection, setBookCollection] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch books once globally
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await endPoint.get("/books");
        const data = response.data;
        setBookCollection(data.books || []);
      } catch (err) {
        setError("Failed to load books");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };

  // Calculate total
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const book = bookCollection.find((b) => String(b.id) === String(itemId));
      return book ? total + book.price * quantity : total;
    }, 0);
  };

  const contextValue = {
    bookCollection,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loading,
    error,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
