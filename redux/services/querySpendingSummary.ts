import { Customer } from "@/generated/prisma/client";
import { baseUrlAndHeader } from "./baseUrlApi";
import { setCustomer } from "../slices/Customer.slice";

export const spendingSummary = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    spendingSummary: builder.query<SpendingSummary, { customerId: string,period?:string }>({
      query: ({ customerId ,period}) => `customers/${customerId}/spending/summary${period?`?period=${period}`:""}`,
      providesTags: ["spendingSummary"],
      keepUnusedDataFor: 3000,
   
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazySpendingSummaryQuery,
  useSpendingSummaryQuery,
} = spendingSummary;