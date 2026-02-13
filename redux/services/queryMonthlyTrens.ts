
import { baseUrlAndHeader } from "./baseUrlApi";


export const monthlyTrends = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    monthlyTrends: builder.query<MonthlyTrend[], { customerId: string,months?:string }>({
      query: ({ customerId ,months}) => `customers/${customerId}/spending/trends${months?`?months=${months}`:""}`,
      providesTags: ["monthlyTrends"],
      keepUnusedDataFor: 3000,
   
    }),
  }),
  overrideExisting: true, 
});

export const {
  useMonthlyTrendsQuery,
  useLazyMonthlyTrendsQuery,
} = monthlyTrends;