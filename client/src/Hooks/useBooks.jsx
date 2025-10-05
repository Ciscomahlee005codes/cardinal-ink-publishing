import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const useBooks = () => {
  const { bookCollection, loading, error } = useContext(StoreContext);
  return { bookCollection, loading, error };
};

export default useBooks;
