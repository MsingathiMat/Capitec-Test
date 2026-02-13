import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrlAndHeader = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",

    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json");


      return headers;
    },
    
  }),
tagTypes:["customerProfile", "spendingSummary","golas","customerTransactions","spendingCategories","categoryList","monthlyTrends"],
  endpoints: () => ({}),
});