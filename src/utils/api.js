import axios from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export function getNews(category) {
  return axios.get(`${baseURL}/${category}.json`);
}

export function getNewsItem(itemId) {
  return axios.get(`${baseURL}/item/${itemId}.json`)
    .then((res) => res.data);
}
