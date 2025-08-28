import { CartItem } from "@/lib/type";
import {
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "@/services/cart";
import { useEffect, useMemo, useState } from "react";

export interface LocalCartState {
  [cart_item_key: string]: {
    product_id: string | number;
    quantity: number;
    price: number;
    name: string
  };
}

// hooks/useLocalCart.ts

export const useLocalCart = (initialCartItems?: CartItem[]) => {
  const [localCart, setLocalCart] = useState<LocalCartState>({});

  const [updateCartItem, { isLoading: addingToCart }] = useUpdateCartMutation();
  const [removeFromCard, { isLoading: removingFromCart }] =
    useRemoveFromCartMutation();

  // Initialize local cart with API data
  useEffect(() => {
    if (initialCartItems && initialCartItems.length > 0) {
      const initialState: LocalCartState = {};
      initialCartItems.forEach((item) => {
        initialState[item.cart_item_key] = {
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        };
      });
      setLocalCart(initialState);
    }
  }, [initialCartItems]);

  // Calculate totals
  const calculations = useMemo(() => {
    const items = Object.values(localCart);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      totalItems,
      subtotal: subtotal.toFixed(2),
    };
  }, [localCart]);

  // Update item quantity
  const updateQuantity = (cart_item_key: string, newQuantity: number) => {
    updateCartItem({ cart_item_key, quantity: newQuantity });
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      setLocalCart((prev) => {
        const updated = { ...prev };
        delete updated[cart_item_key];
        return updated;
      });
    } else {
      setLocalCart((prev) => ({
        ...prev,
        [cart_item_key]: {
          ...prev[cart_item_key],
          quantity: newQuantity,
        },
      }));
    }
  };

  // Remove item completely
  const removeItem = (cart_item_key: string) => {
    removeFromCard({ cart_item_key });
    setLocalCart((prev) => {
      const updated = { ...prev };
      delete updated[cart_item_key];
      return updated;
    });
  };

  // Get final cart data for API submission
  const getFinalCartData = () => {
    return Object.entries(localCart).map(([cart_item_key, item]) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      name: item.name,
      price: item.price
    }));
  };

  // Get current quantity for a specific item
  const getItemQuantity = (cart_item_key: string) => {
    return localCart[cart_item_key]?.quantity || 0;
  };

  return {
    localCart,
    calculations,
    updateQuantity,
    removeItem,
    getFinalCartData,
    getItemQuantity,
  };
};
