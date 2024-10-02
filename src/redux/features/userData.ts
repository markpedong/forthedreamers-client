import { TCartItem, TUserDataState, TUserInfo } from '@/api/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TUserDataState = {
  user: {
    id: '',
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    image: '',
  },
  cart: [],
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetUserDataSlice: () => initialState,
    setUserData: (s, a: PayloadAction<TUserInfo>) => ({ ...s, user: a.payload }),
    setCartData: (s, a: PayloadAction<TCartItem[]>) => ({ ...s, cart: a.payload }),
  },
})

export const { resetUserDataSlice, setCartData, setUserData } = userDataSlice.actions

export default userDataSlice.reducer
