import { useState } from 'react'

type UseAuth = {
  isAuth: boolean
  toggleAuth: () => void
}

export const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState(false)

  const toggleAuth = (): void => {
    setAuthenticated(!authenticated)
  }

  return { isAuth: authenticated, toggleAuth: toggleAuth }
}
