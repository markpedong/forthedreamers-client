import { TCartItem, TUserDataState } from '@/api/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TUserDataState = {
  user: {
    id: '',
  },
  cart: [],
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetUserDataSlice: () => initialState,
    setCartData: (s, a: PayloadAction<TCartItem[]>) => ({ ...s, cart: a.payload }),
  },
})

export const { resetUserDataSlice, setCartData } = userDataSlice.actions

export default userDataSlice.reducer
