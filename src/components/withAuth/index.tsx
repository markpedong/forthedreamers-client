'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getLocalStorage } from '@/lib/xLocalStorage'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC: React.FC = props => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const token = getLocalStorage('token')
      if (!token) {
        router.push('/auth')
      } else {
        setLoading(false)
      }
    }, [router])

    if (loading) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }

  return AuthHOC
}

export default withAuth
