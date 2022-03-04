import styles from "./CommentsTree.module.scss";
import Comment from "../Comment/Comment";
import React from "react";
import { useSelector } from "react-redux";
import { selectNewsItemComments } from "../../utils/newsSlice";

const CommentsTree = ({ parentId, level = 0 }) => {
  const {comments, itemId} = useSelector(selectNewsItemComments);

  if (!parentId) {
    parentId = itemId;
  }

  if (!comments) {
    return null;
  }

  const commentsToRender = comments.filter(comment => {
    return comment.parent === parentId;
  })

  if (!commentsToRender.length) {
    return null;
  }

  return (
    <ul className={styles.commentsTree}>
      {commentsToRender.map(item => (
        <Comment key={item.id} item={item} level={level}>
          <CommentsTree parentId={item.id} level={level + 1}/>
        </Comment>
      ))}
    </ul>
  )
}

export default CommentsTree;