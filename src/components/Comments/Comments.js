import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectCommentsError, selectCommentsStatus, selectNewsItem } from "../../utils/newsSlice";
import styles from "./Comments.module.scss";
import Spinner from "../Spinner/Spinner";
import CommentsTree from "../CommentsTree/CommentsTree";

const Comments = () => {
  const dispatch = useDispatch();
  const { descendants } = useSelector(selectNewsItem);


  const status = useSelector(selectCommentsStatus);
  const error = useSelector(selectCommentsError);

  useEffect(() => {
    if (descendants) {
      dispatch(fetchComments());
    }
  }, [descendants])

  if (descendants) {
    if (status === 'idle' || status === 'loading') {
      return (
        <div className={styles.comments}>
          <p className={styles.commentsCount}>{descendants} comments</p>
          <Spinner/>
        </div>
      )
    }

    if (status === 'failed') {
      return <p>{error}</p>
    }

    if (status === 'succeeded') {
      return (
        <div className={styles.comments}>
          <p className={styles.commentsCount}>{descendants} comments</p>
          <CommentsTree/>
        </div>
      )
    }
  } else {
    return <p>No comments yet</p>
  }
}

export default Comments;