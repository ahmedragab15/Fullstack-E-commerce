import CookieService from "@/services/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/products?populate=thumbnail&populate=category&pagination[page]=${page}&pagination[pageSize]=5`,
        };
      },
      providesTags: ["Products"],
    }),
    deleteDashboardProduct: builder.mutation({
      query: (documentId) => {
        return {
          url: `/products/${documentId}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset-UTF-8",
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateDashboardProduct: builder.mutation({
      query: (arg) => {
        return {
          url: `/products/${arg?.documentId}`,
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset-UTF-8",
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
          body: {
            data: {
              ...arg,
            },
          },
        };
      },
    }),
  }),
});

export const { useGetDashboardProductsQuery, useDeleteDashboardProductMutation,useUpdateDashboardProductMutation } = productsApiSlice;
