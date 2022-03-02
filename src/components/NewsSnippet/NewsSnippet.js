import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsSnippet.module.scss';

const NewsSnippet = ({ item }) => {
  const Title = () => {
    if (item.title) {
      return <h2 className={styles.title}>{item.title}</h2>
    } else {
      return null;
    }
  }

  const Author = () => {
    if (item.by) {
      return (
        <div className={styles.articleDetails}>
          <p className={styles.detailsHeader}>Published by</p>
          <p className={styles.articleDetail}>{item.by}</p>
        </div>
      )
    } else {
      return null;
    }
  }

  const Date = () => {
    if (item.time) {
      return (
        <div className={styles.articleDetails}>
          <p className={styles.detailsHeader}>Published on</p>
          <p className={styles.articleDetail}><time dateTime={item.dateTime}>{item.humanReadableTime}</time></p>
        </div>
      )
    } else {
      return null;
    }
  }

  const Rating = () => {
    if (item.score) {
      return (
        <div className={styles.articleDetails}>
          <p className={styles.detailsHeader}>Rating</p>
          <p className={styles.articleDetail}>{item.score} pts</p>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <article className={styles.article}>
      <li className={styles.newsSnippet}>
        <Link to={`/${item.id}`} className={styles.link}>
          <Title/>
          <Author/>
          <Date/>
          <Rating/>
        </Link>
      </li>
    </article>
  )
};

export default NewsSnippet;
