import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const baseQuery = (baseUrl = `/api/`) => {
  return fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const acceessToken = cookies.get("access_token");
      if (acceessToken) {
        headers.set("Cookie", acceessToken);
      }
      headers.set("X-CSRF-Token", "");
      return headers;
    },
  });
};