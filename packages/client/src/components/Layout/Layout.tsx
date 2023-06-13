import { ReactNode, FC } from 'react'
import { Header } from '../Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
