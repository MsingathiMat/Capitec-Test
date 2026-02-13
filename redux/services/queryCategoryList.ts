
import { baseUrlAndHeader } from "./baseUrlApi";


export const categoryList = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    categoryList: builder.query<Category[], { customerId: string}>({
      query: ({ customerId }) => `customers/${customerId}/categoryList`,
      providesTags: ["categoryList"],
      keepUnusedDataFor: 3000,
   
    }),
  }),
  overrideExisting: true,
});

export const {
  useCategoryListQuery,
  useLazyCategoryListQuery,
} = categoryList;