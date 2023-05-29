import {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Pagination from 'react-js-pagination'

import { Link, useNavigate } from 'react-router-dom'
import s from './ForumPage.module.scss'
import { Button } from '../../components/Button'
import { withAuth } from '../../hocs/withAuth'
import { Layout } from '../../components/Layout'
import {
  useCreateForumMutation,
  useGetForumsMutation,
} from '../../store/forum.api'
import { ForumData, ForumRequestParams } from '../../types/forum.types'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import { Spinner } from '../../components/Spinner'
import { TEXTS } from '../../constants/requests'
import { useAlert } from 'react-alert'
import { OverlayBlur } from '../../components/OverlayBlur'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'

const ForumPage = () => {
  const actions = useActions()
  const alert = useAlert()
  const popupElemRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [params, setParams] = useState<ForumRequestParams>({
    page: 1,
    take: 5,
  })
  const [total, setTotal] = useState<number>(0)
  const [getForums, { isLoading }] = useGetForumsMutation()
  const [createForum] = useCreateForumMutation()
  const { forums } = useAppSelector(state => state.forum)
  const isMount = useAppSelector(state => state.forum.isMount)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [modalError, setModalError] = useState(false)
  const [forumName, setForumName] = useState('')

  const goBack = function () {
    navigate(-1)
  }

  const fetchForums = async (params: ForumRequestParams) => {
    try {
      const forumData = await getForums(params).unwrap()

      if (!forumData) {
        return
      }

      actions.setForums(forumData.forums)
      setTotal(forumData.total)
    } catch {
      if (isMount) {
        alert.show(TEXTS.ERROR)
      }
    }
  }

  const fetchNewForums = async () => {
    try {
      const newForumData = await createForum(forumName).unwrap()

      if (!newForumData) {
        return
      }

      actions.addNewForum({ ...newForumData, topicsCount: 0, commentsCount: 0 })
      setTotal(total => total + 1)
      setIsModalVisible(false)
      setForumName('')
    } catch {
      if (isMount) {
        alert.show(TEXTS.ERROR)
      }
    }
  }

  const handleAddForumButtonClick = useCallback(() => {
    setModalError(false)
    setIsModalVisible(true)
  }, [])

  const handleOverlayClick = useCallback((event: BaseSyntheticEvent) => {
    const contains =
      popupElemRef.current === event.target ||
      popupElemRef.current?.contains(event.target)

    if (!contains) {
      setIsModalVisible(false)
      setShowDescription(false)
    }
  }, [])

  const handleModalSubmit = useCallback(async () => {
    await fetchNewForums()
  }, [forumName])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setForumName(value)
  }

  const handlePageChange = (number: number) => {
    const newParams = {
      ...params,
      page: number,
    }

    setParams(newParams)
    fetchForums(newParams)
  }

  const handleCLickForum = (forumId: number) => {
    actions.setForumId(forumId)
  }

  useEffect(() => {
    actions.setIsMount(true)
    fetchForums(params)

    return () => {
      actions.setIsMount(false)
    }
  }, [])

  return (
    <Layout>
      <div className={s.ForumPage}>
        <div className={s.ForumPage__container}>
          <h2 className={s.ForumPage__title}>Forum List</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ul className={s.ForumPage__list}>
                <li className={s.ForumPage__item}>
                  <p>total: {total}</p>
                  <p>topics</p>
                  <p>answers</p>
                </li>
                {forums.map(
                  (forum: ForumData, index: number) =>
                    index < 5 && (
                      <li
                        key={forum.id}
                        onClick={() => handleCLickForum(forum.id)}>
                        <Link
                          to={`/forums/${forum.id}`}
                          className={s.ForumPage__item}>
                          <p>{forum.title || 'MISSING TITLE'}</p>
                          <p>{forum.topicsCount}</p>
                          <p>{forum.commentsCount}</p>
                        </Link>
                      </li>
                    )
                )}
              </ul>
              <div className={s.ForumPage__buttons}>
                <Button text="Go back" onClick={goBack} />
                <Button text="Add forum" onClick={handleAddForumButtonClick} />
              </div>
            </>
          )}
          <Pagination
            activePage={params.page}
            itemsCountPerPage={params.take}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={e => handlePageChange(e)}
            innerClass={s.ForumPage__pagination}
            linkClass={s.ForumPage__button}
            activeLinkClass={s.ForumPage__buttonActive}
            disabledClass={s.ForumPage__buttonDisabled}
          />
        </div>
      </div>
      {isModalVisible && (
        <OverlayBlur onClick={handleOverlayClick}>
          <Modal
            ref={popupElemRef}
            onClick={handleModalSubmit}
            title={'Add forum'}
            buttonText="Create Forum"
            showDescription={showDescription}
            descriptionText="">
            <div style={{ maxWidth: '100%' }}>
              <Input
                label=""
                name={'forumName'}
                placeholder={'new forum name'}
                type={'text'}
                value={forumName}
                onChange={handleOnChange}
                style={{ maxWidth: '100%' }}
              />
            </div>

            {modalError && (
              <p className={s.ForumPage__errorMessage}>Couldn't save avatar!</p>
            )}
          </Modal>
        </OverlayBlur>
      )}
    </Layout>
  )
}

export default withAuth(ForumPage)
