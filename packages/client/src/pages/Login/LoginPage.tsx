import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'

export const LoginPage = () => {
  const navigate = useNavigate()

  const goHomePage = () => {
    navigate(PATHNAMES.HOME)
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={goHomePage}>Go to Home page</button>
    </div>
  )
}
