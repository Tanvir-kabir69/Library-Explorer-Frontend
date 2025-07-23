import type { IBook } from "@/interfaces/bookInterface";
import type { TResponse } from "@/interfaces/responseInterface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  tagTypes: ["Books"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ph-l-2-b-5-a-3-basic-library-manage.vercel.app/api",
  }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (build) => ({
    getAllBooks: build.query<TResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getASingleBook: build.query<TResponse<IBook>, string>({
      query: (id) => `/books/${id}`,
    }),
    addBook: build.mutation<TResponse<IBook>, Partial<IBook>>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: build.mutation<
      TResponse<IBook>,
      { id: string; data: Partial<IBook> }
    >({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: build.mutation<TResponse<any>, string>({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetASingleBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
