import React from "react";
import styles from './Comment.module.scss';

const Comment = ({item, children}) => {
  return (
    <li className={styles.comment}>
      {/*assuming server checks user content for XSS*/}
      {item.text && <p dangerouslySetInnerHTML={{ __html: item.text }}/>}
      {item.by && <p className={styles.author}>By {item.by}</p>}
      {item.time && <p className={styles.date}><time dateTime={item.dateTime}>{item.humanReadableTime}</time></p>}
      {children}
    </li>
  )
}

export default Comment;