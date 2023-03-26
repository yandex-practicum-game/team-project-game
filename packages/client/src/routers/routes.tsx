import { RouteObject } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { PATHNAMES } from '../constants/pathnames'
import { RegistrationPage } from '../pages/Registration'

export const routes: RouteObject[] = [
  { path: PATHNAMES.HOME, element: <HomePage /> },
  { path: PATHNAMES.LOGIN, element: <LoginPage /> },
  { path: PATHNAMES.REGISTRATION, element: <RegistrationPage /> },
]
