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
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),
    updateDashboardProduct: builder.mutation({
      query: ({ documentId, body }) => ({
        url: `/products/${documentId}?populate=category&populate=thumbnail`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ documentId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData("getDashboardProducts", documentId, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetDashboardProductsQuery, useDeleteDashboardProductMutation, useUpdateDashboardProductMutation } = productsApiSlice;
