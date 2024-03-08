import { configureStore } from '@reduxjs/toolkit'
import ChatSlice from "../Slices/User.Slice"

export const store = configureStore({
  reducer: {
    chatSlice : ChatSlice
  },
})