import { TWebsiteItem } from '@/api/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TAppDataState = {
  website: TWebsiteItem
}
const initialState: TAppDataState = {
  website: {
    landing_image1: '',
    landing_image2: '',
    landing_image3: '',
    marquee_text: '',
    promo_text: '',
    website_name: '',
  },
}

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    resetAppDataSlice: () => initialState,
    setWebsiteData: (state, action: PayloadAction<TWebsiteItem>) => ({ ...state, website: action.payload }),
  },
})

export const { resetAppDataSlice, setWebsiteData } = appDataSlice.actions

export default appDataSlice.reducer
