import { Customer } from "@/generated/prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CustomerState {
  customer: Customer | null;
 
}

const initialState: CustomerState = {
  customer: null,
 
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
     
    },
    updateCustomer(state, action: PayloadAction<Partial<Customer>>) {
      if (state.customer) {
        state.customer = {
          ...state.customer,
          ...action.payload,
        };
      }
    },
    clearCustomer(state) {
      state.customer = null;
    
    },
  },
});

export const {
  setCustomer,
  updateCustomer,
  clearCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;