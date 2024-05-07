import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";

export function useCart() {
  return useQuery<
    { cart: { Items: { productId: string; count: number }[] } },
    AxiosError
  >("cart", async () => {
    const res = await axios.get(`${API_PATHS.cart}/api/profile/cart`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    });
    return res.data.data;
  });
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((params: { productId: string; action: "inc" | "dec" }) =>
    axios.put<CartItem[]>(`${API_PATHS.cart}/api/profile/cart`, params, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
