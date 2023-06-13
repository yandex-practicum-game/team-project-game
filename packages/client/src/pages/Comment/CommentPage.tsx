import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '../../components/Layout'
import { Spinner } from '../../components/Spinner'
import { withAuth } from '../../hocs/withAuth'
import s from './CommentPage.module.scss'
import { useActions } from '../../hooks/useActions'
import { useAlert } from 'react-alert'
import {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useGetCommentsMutation } from '../../store/comment.api'
import { useCreateCommentMutation } from '../../store/comment.api'
import { CommentRequestParams } from '../../types/comment.types'
import { useAppSelector } from '../../hooks/useAppSelector'
import { TEXTS } from '../../constants/requests'
import { CommentData } from '../../types/comment.types'
import { Button } from '../../components/Button'
import Pagination from 'react-js-pagination'
import { OverlayBlur } from '../../components/OverlayBlur'
import { Modal } from '../../components/Modal'
import { Input } from '../../components/Input'

const CommentPage = () => {
  const { id: paramId } = useParams()
  const navigate = useNavigate()
  const actions = useActions()
  const alert = useAlert()
  const popupElemRef = useRef<HTMLInputElement>(null)
  const [getComments, { isLoading }] = useGetCommentsMutation()
  const [createComment] = useCreateCommentMutation()
  const { comments, isMount } = useAppSelector(state => state.comment)
  const [total, setTotal] = useState<number>(0)
  const [modalError, setModalError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [commentText, setcommentText] = useState('')
  const [params, setParams] = useState<CommentRequestParams | null>(null)

  const goBack = function () {
    navigate(-1)
  }

  const fetchComments = async (params: CommentRequestParams) => {
    try {
      const commentData = await getComments(params).unwrap()

      if (!commentData) {
        return
      }

      actions.setComments(commentData.comments)
      setTotal(commentData.total)
    } catch {
      if (isMount) {
        alert.show(TEXTS.ERROR)
      }
    }
  }

  const fetchNewComment = async () => {
    try {
      const newCommentData = await createComment({
        content: commentText,
        parentId: null,
        topicId: Number(paramId),
      }).unwrap()

      if (!newCommentData) {
        return
      }

      actions.addNewComment(newCommentData)
      setTotal(total => total + 1)
      setIsModalVisible(false)
      setcommentText('')
    } catch {
      if (isMount) {
        alert.show(TEXTS.ERROR)
      }
    }
  }

  useEffect(() => {
    if (!Number(paramId)) {
      return
    }

    const newParams = {
      page: 1,
      take: 5,
      topicId: Number(paramId) || 0,
    }
    setParams(newParams)

    fetchComments(newParams)
    actions.setIsMount(true)

    return () => {
      actions.setIsMount(false)
    }
  }, [])

  const handleAddCommentButtonClick = useCallback(() => {
    setModalError(false)
    setIsModalVisible(true)
  }, [])

  const handlePageChange = (number: number) => {
    if (!params) {
      return
    }

    const newParams = {
      ...params,
      page: number,
    }

    setParams(newParams)
    fetchComments(newParams)
  }

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
    await fetchNewComment()
  }, [commentText])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setcommentText(value)
  }

  if (!params) {
    return (
      <div className={s.CommentPage__spinner}>
        <Spinner />
      </div>
    )
  }

  return (
    <Layout>
      <div className={s.CommentPage}>
        <div className={s.CommentPage__container}>
          <h2 className={s.CommentPage__title}>Comments</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ul className={s.CommentPage__list}>
                <li className={s.CommentPage__item}>
                  <p>total {total}</p>
                  <p>comments</p>
                </li>
                {comments.map(
                  (comment: CommentData, index: number) =>
                    index < 5 && (
                      <li className={s.CommentPage__item} key={comment.id}>
                        <p>{comment.userId}</p>
                        <p>{comment.content}</p>
                      </li>
                    )
                )}
              </ul>
              <div className={s.CommentPage__buttons}>
                <Button text="Go back" onClick={goBack} />
                <Button
                  text="Add comment"
                  onClick={handleAddCommentButtonClick}
                />
              </div>
            </>
          )}
          <Pagination
            activePage={params.page}
            itemsCountPerPage={params.take}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={e => handlePageChange(e)}
            innerClass={s.CommentPage__pagination}
            linkClass={s.CommentPage__button}
            activeLinkClass={s.CommentPage__buttonActive}
            disabledClass={s.CommentPage__buttonDisabled}
          />
        </div>
      </div>
      {isModalVisible && (
        <OverlayBlur onClick={handleOverlayClick}>
          <Modal
            ref={popupElemRef}
            onClick={handleModalSubmit}
            title={'Add comment'}
            buttonText="Create Comment"
            showDescription={showDescription}
            descriptionText="">
            <div style={{ maxWidth: '100%' }}>
              <Input
                label=""
                name={'commentText'}
                placeholder={'new comment'}
                type={'text'}
                value={commentText}
                onChange={handleOnChange}
                style={{ maxWidth: '100%' }}
              />
            </div>

            {modalError && (
              <p className={s.CommentPage__errorMessage}>
                Couldn't save avatar!
              </p>
            )}
          </Modal>
        </OverlayBlur>
      )}
    </Layout>
  )
}

export default withAuth(CommentPage)
