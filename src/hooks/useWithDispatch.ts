import { getWebsiteData } from '@/api'
import { setWebsiteData } from '@/redux/features/appData'
import { useAppDispatch } from '@/redux/store'

export const useWithDispatch = () => {
  const dispatch = useAppDispatch()

  const dispatchWebData = async () => {
    const res = await getWebsiteData({})
    dispatch(setWebsiteData(res?.data!))
  }

  return {
    dispatchWebData,
  }
}
