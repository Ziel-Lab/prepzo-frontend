"use client";

import React, { useContext, useEffect, useState } from "react";
import { products } from "@/data/products";
import { openCart } from "@/utils/toggleCart";
import { usePathname } from "next/navigation";

// Define a Product interface (adjust fields as necessary)
export interface Product {
  id: number; // adjust to string if needed
  price: number;
  quantity?: number;
  // Add other product fields as needed
}

// Define the shape of our context value
interface AppContextType {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
  addProductToCart: (id: Product["id"]) => void;
  isAddedToCartProducts: (id: Product["id"]) => boolean;
  toggleWishlist: (id: Product["id"]) => void;
  isAddedtoWishlist: (id: Product["id"]) => boolean;
  quickViewItem: Product;
  wishList: Product["id"][];
  setQuickViewItem: React.Dispatch<React.SetStateAction<Product>>;
  isDark: boolean;
  handleToggle: () => void;
}

// Create the context with an undefined default value
const dataContext = React.createContext<AppContextType | undefined>(undefined);

// Custom hook to consume the context
export const useContextElement = (): AppContextType => {
  const context = useContext(dataContext);
  if (!context) {
    throw new Error("useContextElement must be used within a ContextProvider");
  }
  return context;
};

// Define props for the Context component
interface ContextProps {
  children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
  const pathname = usePathname();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [wishList, setWishList] = useState<Product["id"][]>([]);
  const [quickViewItem, setQuickViewItem] = useState<Product>(products[0]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + (product.quantity || 0) * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (id: Product["id"]) => {
    if (!cartProducts.find((elm) => elm.id === id)) {
      const product = products.find((elm) => elm.id === id);
      if (product) {
        const item = { ...product, quantity: 1 };
        setCartProducts((prev) => [...prev, item]);
        openCart();
      }
    }
  };

  const isAddedToCartProducts = (id: Product["id"]): boolean => {
    return cartProducts.some((elm) => elm.id === id);
  };

  const toggleWishlist = (id: Product["id"]) => {
    if (wishList.includes(id)) {
      setWishList((prev) => prev.filter((elm) => elm !== id));
    } else {
      setWishList((prev) => [...prev, id]);
    }
  };

  const isAddedtoWishlist = (id: Product["id"]): boolean => {
    return wishList.includes(id);
  };

  // Load cart products from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartList");
    if (storedCart) {
      const items: Product[] = JSON.parse(storedCart);
      if (items?.length) {
        setCartProducts(items);
      }
    }
  }, []);

  // Persist cart products to localStorage
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const items: Product["id"][] = JSON.parse(storedWishlist);
      if (items?.length) {
        setWishList(items);
      }
    }
  }, []);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleDark = (value: boolean) => {
    if (value) {
      document.documentElement.classList.add("uc-dark");
    } else {
      document.documentElement.classList.remove("uc-dark");
    }
  };

  useEffect(() => {
    const getBooleanValue = (key: string): boolean => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : false; // Default to false if not found
    };

    const savedValue = getBooleanValue("isDark");
    toggleDark(savedValue);
    setIsDark(savedValue);
  }, []);

  const handleToggle = () => {
    const saveBooleanValue = (key: string, value: boolean) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
    const newValue = !isDark;
    setIsDark(newValue);
    saveBooleanValue("isDark", newValue);
    toggleDark(newValue);
  };

  const contextElement: AppContextType = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    toggleWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    isDark,
    handleToggle,
  };

  useEffect(() => {
    if (isDark) {
      document.querySelector(".page-wrapper")?.classList.add("uc-dark");
    } else {
      document.querySelector(".page-wrapper")?.classList.remove("uc-dark");
    }
  }, [pathname, isDark]);

  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
};

export default Context;
