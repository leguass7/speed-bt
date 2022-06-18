import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import type { IResponseUser, IUser } from '~/server-side/users'
import { getMe } from '~/service/api/user'

export interface IUserContext {
  requestMe: () => Promise<void | IResponseUser>
  userData: IUser | null
  setUserData: React.Dispatch<React.SetStateAction<IUser>>
  loadingUser?: boolean
  userError?: boolean
}

export const UserContext = createContext({} as IUserContext)

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loadingUser, setLoadingUser] = useState(false)
  const [userData, setUserData] = useState<IUserContext['userData']>(null)
  const [userError, setUserError] = useState(false)

  const requestMe = useCallback(async () => {
    setLoadingUser(true)
    const response = await getMe()
    setLoadingUser(false)
    if (response && response?.user) {
      setUserData(response.user)
      setUserError(false)
    } else {
      toast.error(response?.message || 'Erro de autenticação')
      setUserError(true)
    }
    return response
  }, [])

  return <UserContext.Provider value={{ requestMe, userData, loadingUser, userError, setUserData }}>{children}</UserContext.Provider>
}

export function useUserAuth() {
  const { status, data } = useSession()
  const { userData, loadingUser, requestMe, userError, setUserData } = useContext(UserContext)

  const [loading, authenticated] = useMemo(() => {
    return [!!(loadingUser || status === 'loading'), !!(status === 'authenticated')]
  }, [loadingUser, status])

  const completedAuth = useMemo(() => {
    return !!(authenticated && userData)
  }, [authenticated, userData])

  const updateUserData = useCallback(
    async (data: IUserContext['userData']) => {
      setUserData(old => ({ ...old, ...data }))
    },
    [setUserData]
  )

  useEffect(() => {
    if (!loading && authenticated && !userData && !userError) {
      requestMe().then(res => {
        if (res && !res?.success) toast.warn(data?.user?.name || 'no user')
      })
    }
  }, [requestMe, authenticated, userData, loading, data, userError])

  return { loading, userData, completedAuth, userError, updateUserData, requestMe, authenticated, data }
}
