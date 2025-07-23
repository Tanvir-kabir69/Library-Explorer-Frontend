import type { IBorrow } from "@/interfaces/borrowInterface";
import type { IBorrowSummaryData } from "@/interfaces/borrowResponse";
import type { TResponse } from "@/interfaces/responseInterface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  tagTypes: ["Borrow"],
    baseQuery: fetchBaseQuery({ baseUrl: "https://ph-l-2-b-5-a-3-basic-library-manage.vercel.app/api" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (build) => ({
    getBorrowInfo: build.query<TResponse<IBorrowSummaryData[]>, void>({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
    addBorrowing: build.mutation<TResponse<IBorrow>, Partial<IBorrow>>({
      query: (borowingData) => ({
        url: "/borrow",
        method: "POST",
        body: borowingData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Borrow"],
    }),
  }),
});

export const { useGetBorrowInfoQuery, useAddBorrowingMutation } = borrowApi;
