import React from "react";
import styles from './Controls.module.scss';
import {
  fetchNews,
  selectCategory,
  selectResultsPerPage,
  updateCategory,
  updateResultsPerPage
} from "../../utils/newsSlice";
import { useDispatch, useSelector } from "react-redux";

const Controls = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(selectCategory);
  const currentResults = useSelector(selectResultsPerPage);

  const handleRefreshClick = () => {
    dispatch(fetchNews())
  }

  const handleCategoryChange = (evt) => {
    dispatch(updateCategory(evt.target.value));
    dispatch(fetchNews());
  }

  function handleResultsPerPageChange(evt) {
    dispatch(updateResultsPerPage(evt.target.value));
    dispatch(fetchNews());
  }

  return (
    <div className={styles.controls}>
      <button onClick={handleRefreshClick} className={styles.button}>Refresh</button>
      <select onChange={handleCategoryChange} className={styles.select} value={currentCategory}>
        <option name="newstories" value="newstories">Newest</option>
        <option name="topstories" value="topstories">Hottest</option>
      </select>
      <select onChange={handleResultsPerPageChange} className={styles.select} value={currentResults}>
        <option name="10" value="10">10</option>
        <option name="50" value="50">50</option>
        <option name="100" value="100">100</option>
      </select>
    </div>
  )
}

export default Controls;