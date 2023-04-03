import { RouteObject } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { PATHNAMES } from '../constants/pathnames'
import { RegistrationPage } from '../pages/Registration'
import { ErrorPage } from '../pages/Error'
import { StartGame } from '../pages/StartGame/StartGame'
import { GameOver } from '../pages/GameOver'
import { LeaderboardPage } from '../pages/Leaderboard'
import { ForumPage } from '../pages/Forum'
import { PasswordEditPage } from '../pages/PasswordEdit'
import { ProfileEditPage } from '../pages/ProfileEdit'
import { ProfilePage } from '../pages/Profile'
import { PresentationPage } from '../pages/PresentationPage'

export const routes: RouteObject[] = [
  { path: PATHNAMES.HOME, element: <HomePage /> },
  { path: PATHNAMES.LOGIN, element: <LoginPage /> },
  { path: PATHNAMES.REGISTRATION, element: <RegistrationPage /> },
  { path: PATHNAMES.GALAXIAN, element: <StartGame /> },
  { path: PATHNAMES.GAMEOVER, element: <GameOver /> },
  {
    path: PATHNAMES.ERROR_500,
    element: <ErrorPage title={'500'} subtitle={'Invalid server error'} />,
  },
  {
    path: PATHNAMES.ERROR_404,
    element: <ErrorPage title={'404'} subtitle={'Page is not found'} />,
  },
  { path: PATHNAMES.LEADERBOARD, element: <LeaderboardPage /> },
  { path: PATHNAMES.FORUM, element: <ForumPage /> },
  { path: PATHNAMES.PROFILE, element: <ProfilePage /> },
  { path: PATHNAMES.PROFILE_EDIT, element: <ProfileEditPage /> },
  { path: PATHNAMES.PASSWORD_EDIT, element: <PasswordEditPage /> },
  { path: PATHNAMES.PRESENTATION, element: <PresentationPage /> },
]
