import { toast } from 'sonner'

import { getLocalStorage } from '@/lib/xLocalStorage'

export const clearUserData = () => {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  caches.keys().then(keys => {
    keys.forEach(key => caches.delete(key))
  })

  indexedDB.databases().then(dbs => {
    dbs.forEach(db => indexedDB.deleteDatabase(db.name!))
  })

  localStorage.clear()
  sessionStorage.clear()
}

export const isLoggedIn = () => {
  const tokenFromLocalStorage = localStorage && getLocalStorage('token')
  const tokenFromCookies = document.cookie.split('; ').find(row => row.startsWith('token='))

  const cookieToken = tokenFromCookies ? tokenFromCookies.split('=')[1] : null

  return !!(tokenFromLocalStorage && cookieToken)
}

export const invalidUser = () => {
  clearUserData()

  toast('Session expired, login again', {
    description: 'Redirecting you to login page',
  })
  setTimeout(() => {
    window.location.replace('/login')
  }, 1500)
}
