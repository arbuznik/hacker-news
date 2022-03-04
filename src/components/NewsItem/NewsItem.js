import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './NewsItem.module.scss';
import {
  fetchNewsItem,
  selectError,
  selectNewsItem,
  selectNewsItems,
  selectStatus,
  updateNewsItem,
} from '../../utils/newsSlice';
import Spinner from '../Spinner/Spinner';
import Comments from "../Comments/Comments";

const NewsItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newsItemId } = useParams();

  const pageStatus = useSelector(selectStatus);
  const errorMessage = useSelector(selectError);

  const { title, by: author, dateTime, humanReadableTime, url } = useSelector(selectNewsItem);
  const newsItems = useSelector(selectNewsItems);

  useEffect(() => {
    const cachedNewsItem = newsItems.find(newsItem => newsItem.id === Number(newsItemId));

    if (!cachedNewsItem) {
      dispatch(fetchNewsItem({ newsItemId }));
    } else {
      dispatch(updateNewsItem(cachedNewsItem));
    }
  }, [newsItemId, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const BackToNewsButton = () => <button onClick={() => navigate(-1)} className={styles.backButton}>&#8592; Back to news list</button>;

  if (pageStatus === 'loading' || pageStatus === 'idle') {
    return (
      <>
        <BackToNewsButton/>
        <Spinner/>
      </>
    );
  }

  if (pageStatus === 'failed') {
    return (
      <>
        <BackToNewsButton/>
        <p>{errorMessage}</p>
      </>
    );
  }

  if (pageStatus === 'succeeded') {
    return (
      <div className={styles.newsItems}>
        <nav>
          <BackToNewsButton/>
        </nav>
        <article className={styles.newsItem}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {url && <a className={styles.link} href={url} target="_blank">{url}</a>}
          {author && (
            <div className={styles.articleDetails}>
            <p className={styles.detailsHeader}>Published by</p>
            <p className={styles.articleDetail}>{author}</p></div>
          )}
          {humanReadableTime && (
            <div className={styles.articleDetails}>
            <p className={styles.detailsHeader}>Published on</p>
            <p className={styles.articleDetail}><time dateTime={dateTime}>{humanReadableTime}</time></p></div>
          )}
          <Comments/>
        </article>
      </div>
    );
  }
  return null;
};

export default NewsItem;
