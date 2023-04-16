import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ForumPage.module.scss'
import { Button } from '../../components/Button'
import { IForum, mockForumList } from './mock'
import { withAuth } from '../../hocs/withAuth'
import { Layout } from '../../components/Layout'

const ForumPage = () => {
  const navigate = useNavigate()

  const goBack = function () {
    navigate(-1)
  }

  return (
    <Layout>
      <div className={s.ForumPage}>
        <div className={s.ForumPage__container}>
          <h2 className={s.ForumPage__title}>Forum</h2>
          <ul className={s.ForumPage__list}>
            <li className={s.ForumPage__item}>
              <p>forums</p>
              <p>topics</p>
              <p>answers</p>
            </li>
            {mockForumList.map((item: IForum, index: number) => (
              <li className={s.ForumPage__item} key={index}>
                <p>{item.topic}</p>
                <p>{item.count}</p>
                <p>{item.answers}</p>
              </li>
            ))}
          </ul>
          <Button text="Go back" onClick={goBack} />
        </div>
      </div>
    </Layout>
  )
}

export default withAuth(ForumPage)
