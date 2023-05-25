import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ForumPage.module.scss'
import { Button } from '../../components/Button'
import { IForum, mockForumList } from './mock'
import { withAuth } from '../../hocs/withAuth'
import { Layout } from '../../components/Layout'
import { useGetForumsMutation } from '../../store/forum.api'
import { ForumData, ForumRequestParams } from '../../types/forum.types'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import { Spinner } from '../../components/Spinner'
import { TEXTS } from '../../constants/requests'
import { useAlert } from 'react-alert'

const ForumPage = () => {
  const actions = useActions()

  const navigate = useNavigate()
  const [params, setParams] = useState<ForumRequestParams>({
    page: 1,
    take: 10,
  })
  const [getForums, { isLoading }] = useGetForumsMutation()
  const { forums, total } = useAppSelector(state => state.forum)
  const isMount = useAppSelector(state => state.forum.isMount)
  const alert = useAlert()

  const goBack = function () {
    navigate(-1)
  }

  useEffect(() => {
    if (forums.length !== 0) {
      return
    }
    const fetchForums = async () => {
      try {
        const forumData = await getForums({
          page: params.page,
          take: params.take,
        }).unwrap()

        if (!forumData) {
          return
        }

        actions.setForums(forumData.forums)
        actions.setTotal(forumData.total)
      } catch {
        if (isMount) {
          alert.show(TEXTS.ERROR)
        }
      }
    }
    fetchForums()
    actions.setIsMount(true)

    return () => {
      actions.setIsMount(false)
    }
  }, [])

  return (
    <Layout>
      <div className={s.ForumPage}>
        <div className={s.ForumPage__container}>
          <h2 className={s.ForumPage__title}>Forum</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ul className={s.ForumPage__list}>
                <li className={s.ForumPage__item}>
                  <p>forums {total}</p>
                  <p>topics</p>
                  <p>answers</p>
                </li>
                {forums.map((forum: ForumData) => (
                  <li className={s.ForumPage__item} key={forum.id}>
                    <p>{forum.title}</p>
                    <p>{forum.topicsCount}</p>
                    <p>{forum.commentsCount}</p>
                  </li>
                ))}
              </ul>
              <div className={s.ForumPage__buttons}>
                <Button text="Go back" onClick={goBack} />
                <Button text="Add forum" />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default withAuth(ForumPage)
