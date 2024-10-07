import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: number;
  name: string;
  size: string;
  color: string;
  image: any;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (
    id: number,
    name: string,
    size: string,
    color: string,
    image: string,
    price: number
  ) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  setUserId: (userId: number) => void;
  userId: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<number>(null);

  useEffect(() => {
    if (userId) {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      const timestamp = localStorage.getItem(`cart_timestamp_${userId}`);
  
      if (savedCart && timestamp) {
        const timeDiff = Date.now() - Number(timestamp);
        if (timeDiff < 86400000) {
          setCartItems(JSON.parse(savedCart));
        } else {
          localStorage.removeItem(`cart_${userId}`);
          localStorage.removeItem(`cart_timestamp_${userId}`);
        }
      }
    }
  }, [userId]); 

  const saveCartToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
    localStorage.setItem(`cart_timestamp_${userId}`, String(Date.now()));
  };

  const addToCart = (
    id: number,
    name: string,
    size: string,
    color: string,
    image: string,
    price: number
  ) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      let updatedItems;

      if (itemInCart) {
        updatedItems = prevItems.map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...prevItems,
          { id, name, size, color, image, price, quantity: 1 },
        ];
      }

      // Save to localStorage
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        updateItemQuantity,
        cartCount,
        cartTotal,
        setUserId,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
