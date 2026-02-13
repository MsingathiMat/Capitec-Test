// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseUrlAndHeader } from "../services/baseUrlApi";
import customerReducer from "@/redux/slices/Customer.slice"; // <-- import your slice

export const store = configureStore({
  reducer: {
    customer: customerReducer, 
    [baseUrlAndHeader.reducerPath]: baseUrlAndHeader.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseUrlAndHeader.middleware),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;