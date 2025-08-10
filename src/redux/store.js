import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import issueSlice from './slice/issueSlice'
import categorySlice from './slice/categorySlice'
import chatSlice from "./slice/chatSlice"

export const store = configureStore({
  reducer: {

    [baseApi.reducerPath]: baseApi.reducer,
    issueSlice: issueSlice,
    categorySlice: categorySlice,
    chatSlice: chatSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})