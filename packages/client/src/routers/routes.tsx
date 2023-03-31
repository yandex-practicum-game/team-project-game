import { RouteObject } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { PATHNAMES } from '../constants/pathnames'
import { RegistrationPage } from '../pages/Registration'
import { ErrorPage } from '../pages/Error'
import { StartGame } from '../pages/StartGame/StartGame'
import { GameOver } from '../pages/GameOver'

export const routes: RouteObject[] = [
  { path: PATHNAMES.HOME, element: <HomePage /> },
  { path: PATHNAMES.LOGIN, element: <LoginPage /> },
  { path: PATHNAMES.REGISTRATION, element: <RegistrationPage /> },
  { path: PATHNAMES.GALAXIA, element: <StartGame /> },
  { path: PATHNAMES.GAMEOVER, element: <GameOver /> },
  {
    path: PATHNAMES.ERROR_500,
    element: <ErrorPage title={'500'} subtitle={'Invalid server error'} />,
  },
  {
    path: PATHNAMES.ERROR_404,
    element: <ErrorPage title={'404'} subtitle={'Page is not found'} />,
  },
]
