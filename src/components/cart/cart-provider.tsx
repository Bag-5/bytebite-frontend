"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem, FoodItem } from "@/lib/mock";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (food: FoodItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "bytebite-cart";

function computeSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity * item.food.price, 0);
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          setItems(JSON.parse(raw) as CartItem[]);
        }
      } catch {
        // Ignore malformed storage and start fresh.
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, loading]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (food: FoodItem, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.food.id === food.id);
        if (existing) {
          return current.map((item) => (item.food.id === food.id ? { ...item, quantity: item.quantity + quantity } : item));
        }

        toast.success(`${food.name} added to cart.`);
        return [...current, { id: `${food.id}_${Date.now()}`, food, quantity }];
      });
    };

    const removeItem = (id: string) => {
      setItems((current) => current.filter((item) => item.id !== id));
      toast.success("Removed from cart.");
    };

    const updateQuantity = (id: string, quantity: number) => {
      setItems((current) =>
        current
          .map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0)
      );
    };

    const clearCart = () => {
      setItems([]);
      toast.success("Cart cleared.");
    };

    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: computeSubtotal(items),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      loading,
    };
  }, [items, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
