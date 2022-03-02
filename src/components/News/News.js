import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsSnippet from '../NewsSnippet/NewsSnippet';
import styles from './News.module.scss';
import Spinner from '../Spinner/Spinner';
import { fetchNews, selectError, selectNewsItems, selectStatus } from '../../utils/newsSlice';

const News = () => {
  const dispatch = useDispatch();

  const newsItems = useSelector(selectNewsItems);
  const pageStatus = useSelector(selectStatus);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    if (newsItems.length === 0) {
      dispatch(fetchNews());
    }
  }, []);

  // const handleRefreshNews = () => {
  //   dispatch((fetchNews));
  // };

  if (pageStatus === 'loading' || pageStatus === 'idle') {
    return (
      <Spinner/>
    );
  } if (pageStatus === 'failed') {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <section>
        <ul className={styles.newsSnippets}>
          {newsItems.map((item) => <NewsSnippet item={item} key={item.id}/>)}
        </ul>
      </section>
    );
  }
};

export default News;
