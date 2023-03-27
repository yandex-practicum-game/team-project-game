import { RouteObject } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { PATHNAMES } from '../constants/pathnames'
import { RegistrationPage } from '../pages/Registration'
import { ErrorPage } from '../pages/Error'

export const routes: RouteObject[] = [
  { path: PATHNAMES.HOME, element: <HomePage /> },
  { path: PATHNAMES.LOGIN, element: <LoginPage /> },
  { path: PATHNAMES.REGISTRATION, element: <RegistrationPage /> },
  {
    path: PATHNAMES.ERROR500,
    element: (
      <ErrorPage title={'500'} subtitle={'Потеряна связь с космосом.'} />
    ),
  },
  {
    path: PATHNAMES.ERROR404,
    element: (
      <ErrorPage
        title={'404'}
        subtitle={'Ваш корабль попал в неизведанные просторы космоса.'}
      />
    ),
  },
]
