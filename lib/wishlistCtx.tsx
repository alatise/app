import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "./type";
import { getWishlist, saveWishlist } from "./wishlistStorage";

type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const items = await getWishlist();
      setWishlist(items);
    })();
  }, []);

  const toggleWishlist = async (product: Product) => {
    let updated: Product[];
    const exists = wishlist.some((p) => p.id === product.id);

    if (exists) {
      updated = wishlist.filter((p) => p.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    setWishlist(updated);
    await saveWishlist(updated);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
