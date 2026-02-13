
import { baseUrlAndHeader } from "./baseUrlApi";


export const spendingGolas = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    spendingGolas: builder.query<SpendingGoals[], { customerId: string}>({
      query: ({ customerId }) => `customers/${customerId}/goals`,
      providesTags: ["golas"],
      keepUnusedDataFor: 3000,
   
    }),
  }),
  overrideExisting: true,
});

export const {
  useSpendingGolasQuery,
  useLazySpendingGolasQuery,
} = spendingGolas;