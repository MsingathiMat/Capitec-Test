
import { baseUrlAndHeader } from "./baseUrlApi";


export const customerTransactions = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    customerTransactions: builder.query<TransactionsResponse, { customerId: string,query?:string }>({
      query: ({ customerId ,query}) => `customers/${customerId}/transactions${query?`${query}`:""}`,
      providesTags: ["customerTransactions"],
      keepUnusedDataFor: 3000,
   
    }),
  }),
  overrideExisting: true,
});

export const {
  useCustomerTransactionsQuery,
  useLazyCustomerTransactionsQuery,
} = customerTransactions;