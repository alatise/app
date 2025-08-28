import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "./type";

export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // under the hood
  defaultExpires: null, // never expire
  enableCache: true,
});

export const getWishlist = async (): Promise<Product[]> => {
  try {
    return (await storage.load({ key: "wishlist" })) as Product[];
  } catch {
    return [];
  }
};

export const saveWishlist = async (wishlist: Product[]) => {
  await storage.save({ key: "wishlist", data: wishlist });
};

export const toggleWishlist = async (product: Product) => {
  let wishlist = await getWishlist();
  const exists = wishlist.some((p) => p.id === product.id);

  if (exists) {
    wishlist = wishlist.filter((p) => p.id !== product.id);
  } else {
    wishlist.push(product);
  }

  await saveWishlist(wishlist);
  return wishlist;
};
