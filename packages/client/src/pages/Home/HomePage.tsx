import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'
import s from './HomePage.module.scss'

export const HomePage = () => {
  const navigate = useNavigate()

  const goLoginPage = () => {
    navigate(PATHNAMES.LOGIN)
  }

  const goToGameStartPage = () => {
    navigate(PATHNAMES.GALAXIAN)
  }

  const goToGameOverPage = () => {
    navigate(PATHNAMES.GAMEOVER)
  }

  return (
    <header>
      <nav className={s.navbar}>
        <button onClick={goLoginPage}>Go to Login page</button>
        <button onClick={goToGameStartPage}>Go to Game page</button>
        <button onClick={goToGameOverPage}>Go to Game over page</button>
      </nav>
    </header>
  )
}
