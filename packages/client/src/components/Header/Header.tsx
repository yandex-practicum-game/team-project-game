import s from './Header.module.scss'

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'

export const Header = () => {
  const navigationList = useMemo(
    () => [
      { name: 'Home', path: PATHNAMES.HOME },
      { name: 'Login', path: PATHNAMES.LOGIN },
      { name: 'Registration', path: PATHNAMES.REGISTRATION },
      { name: 'Profile', path: PATHNAMES.PROFILE },
      { name: 'Change profile', path: PATHNAMES.PROFILE_EDIT },
      { name: 'Change password', path: PATHNAMES.PASSWORD_EDIT },
      { name: 'Forum', path: PATHNAMES.FORUM },
      { name: 'Leaderboard', path: PATHNAMES.LEADERBOARD },
      { name: 'Game', path: PATHNAMES.GAME },
      { name: 'Error 404', path: PATHNAMES.ERROR_404 },
      { name: 'Error 500', path: PATHNAMES.ERROR_500 },
    ],
    []
  )

  return (
    <header className={s.header}>
      <nav>
        <ul className={s.list}>
          {navigationList.map(item => (
            <li key={item.name} className={s.item}>
              <Link to={item.path} className={s.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
