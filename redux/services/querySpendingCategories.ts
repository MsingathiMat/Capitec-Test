
import { baseUrlAndHeader } from "./baseUrlApi";


export const spendingCategories = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    spendingCategories: builder.query<SpendingGoals[], { customerId: string}>({
      query: ({ customerId }) => `customers/${customerId}/spending/categories`,
      providesTags: ["spendingCategories"],
      keepUnusedDataFor: 3000,
   
    }),
  }),
  overrideExisting: true,
});

export const {
  useSpendingCategoriesQuery,
  useLazySpendingCategoriesQuery,
} = spendingCategories;