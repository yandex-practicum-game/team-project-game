import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'

export const HomePage = () => {
  const navigate = useNavigate()

  const goLoginPage = () => {
    navigate(PATHNAMES.LOGIN)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goLoginPage}>Go to Login page</button>
    </div>
  )
}
