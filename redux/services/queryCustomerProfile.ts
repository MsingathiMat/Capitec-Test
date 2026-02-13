import { Customer } from "@/generated/prisma/client";
import { baseUrlAndHeader } from "./baseUrlApi";
import { setCustomer } from "../slices/Customer.slice";

export const customerProfileApi = baseUrlAndHeader.injectEndpoints({
  endpoints: (builder) => ({
    customerProfile: builder.query<Customer, { customerId: string }>({
      query: ({ customerId }) => `customers/${customerId}/profile`,
      providesTags: ["customerProfile"],
      keepUnusedDataFor: 3000,
      async onQueryStarted({ customerId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCustomer(data)); 
        } catch (err) {
          console.error("Failed to fetch customer profile:", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCustomerProfileQuery,
  useLazyCustomerProfileQuery,
} = customerProfileApi;