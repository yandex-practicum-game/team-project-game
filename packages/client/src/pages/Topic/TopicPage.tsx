import React, {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { withAuth } from '../../hocs/withAuth'
import s from './TopicPage.module.scss'
import { Layout } from '../../components/Layout'
import { OverlayBlur } from '../../components/OverlayBlur'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'
import Pagination from 'react-js-pagination'
import { Button } from '../../components/Button'
import { Spinner } from '../../components/Spinner'
import { useAlert } from 'react-alert'
import { useActions } from '../../hooks/useActions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TopicData, TopicRequestParams } from '../../types/topic.types'
import { useAppSelector } from '../../hooks/useAppSelector'
import { TEXTS } from '../../constants/requests'
import {
  useCreateTopicMutation,
  useGetTopicsMutation,
} from '../../store/topic.api'

const TopicPage = () => {
  const { id: paramId } = useParams()
  const navigate = useNavigate()
  const actions = useActions()
  const alert = useAlert()
  const popupElemRef = useRef<HTMLInputElement>(null)
  const [getTopics, { isLoading }] = useGetTopicsMutation()
  const [createTopic] = useCreateTopicMutation()
  const [params, setParams] = useState<TopicRequestParams | null>(null)
  const [total, setTotal] = useState<number>(0)
  const isMount = useAppSelector(state => state.topic.isMount)
  const { topics } = useAppSelector(state => state.topic)
  const [modalError, setModalError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [topicName, setTopicName] = useState('')

  const goBack = function () {
    navigate(-1)
  }

  const fetchTopics = async (params: TopicRequestParams) => {
    try {
      const topicData = await getTopics(params).unwrap()

      if (!topicData) {
        return
      }

      actions.setTopics(topicData.topics)
      setTotal(topicData.total)
    } catch {
      if (isMount) {
        alert.show(TEXTS.ERROR)
      }
    }
  }

  const handleCLickTopic = (topicId: number) => {
    actions.setTopicId(topicId)
  }

  const handleAddTopicButtonClick = useCallback(() => {
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

  const fetchNewTopic = async () => {
    try {
      const newTopicData = await createTopic({
        title: topicName,
        forumId: Number(paramId),
      }).unwrap()

      if (!newTopicData) {
        return
      }

      actions.addNewTopic(newTopicData)
      setTotal(total => total + 1)
      setIsModalVisible(false)
      setTopicName('')
    } catch {
      if (isMount) {
        alert.show(TEXTS.ERROR)
      }
    }
  }

  const handleModalSubmit = useCallback(async () => {
    await fetchNewTopic()
  }, [])

  useEffect(() => {
    if (!Number(paramId)) {
      return
    }

    const newParams = {
      page: 1,
      take: 5,
      forumId: Number(paramId) || 0,
    }

    setParams(newParams)
    fetchTopics(newParams)
    actions.setIsMount(true)

    return () => {
      actions.setIsMount(false)
    }
  }, [])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTopicName(value)
  }

  const handlePageChange = (number: number) => {
    if (!params) return
    const newParams = {
      ...params,
      page: number,
    }

    setParams(newParams)
    fetchTopics(newParams)
  }

  if (!params)
    return (
      <div className={s.TopicPage__spinner}>
        <Spinner />
      </div>
    )

  return (
    <Layout>
      <div className={s.TopicPage}>
        <div className={s.TopicPage__container}>
          <h2 className={s.TopicPage__title}>
            Topic List of Forum # {paramId}
          </h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ul className={s.TopicPage__list}>
                <li className={s.TopicPage__item}>
                  <p>total {total}</p>
                </li>
                {topics.map(
                  (topic: TopicData, index: number) =>
                    index < 5 && (
                      <li
                        key={topic.id}
                        onClick={() => handleCLickTopic(topic.id)}>
                        <Link
                          to={`/forums/${paramId}/${topic.id}`}
                          className={s.TopicPage__item}>
                          <p>{topic.title}</p>
                        </Link>
                      </li>
                    )
                )}
              </ul>
              <div className={s.TopicPage__buttons}>
                <Button text="Go back" onClick={goBack} />
                <Button text="Add topic" onClick={handleAddTopicButtonClick} />
              </div>
            </>
          )}
          <Pagination
            activePage={params.page}
            itemsCountPerPage={params.take}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={e => handlePageChange(e)}
            innerClass={s.TopicPage__pagination}
            linkClass={s.TopicPage__button}
            activeLinkClass={s.TopicPage__buttonActive}
            disabledClass={s.TopicPage__buttonDisabled}
          />
        </div>
      </div>
      {isModalVisible && (
        <OverlayBlur onClick={handleOverlayClick}>
          <Modal
            ref={popupElemRef}
            onClick={handleModalSubmit}
            title={'Add topic'}
            buttonText="Create Topic"
            showDescription={showDescription}
            descriptionText="">
            <div style={{ maxWidth: '100%' }}>
              <Input
                label=""
                name={'topicName'}
                placeholder={'new topic name'}
                type={'text'}
                value={topicName}
                onChange={handleOnChange}
                style={{ maxWidth: '100%' }}
              />
            </div>

            {modalError && (
              <p className={s.TopicPage__errorMessage}>Couldn't save avatar!</p>
            )}
          </Modal>
        </OverlayBlur>
      )}
    </Layout>
  )
}

export default withAuth(TopicPage)
