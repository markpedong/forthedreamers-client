import { TWebsiteItem } from '@/api/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TAppDataState = {
  website: TWebsiteItem
  orderNote: string
}
const initialState: TAppDataState = {
  website: {
    default_pageSize: 0,
    landing_image1: '',
    landing_image2: '',
    landing_image3: '',
    marquee_text: '',
    promo_text: '',
    website_name: '',
    product_length: 0,
    collection_length: 0,
  },
  orderNote: '',
}

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    resetAppDataSlice: () => initialState,
    setWebsiteData: (state, action: PayloadAction<TWebsiteItem>) => ({ ...state, website: action.payload }),
    setOrderNote: (state, action: PayloadAction<string>) => ({ ...state, orderNote: action.payload }),
  },
})

export const { resetAppDataSlice, setWebsiteData, setOrderNote } = appDataSlice.actions

export default appDataSlice.reducer
