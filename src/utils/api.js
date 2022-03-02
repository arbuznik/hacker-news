import axios from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export function getNews() {
  return axios.get(`${baseURL}/newstories.json`);
}

export function getNewsItem(itemId) {
  return axios.get(`${baseURL}/item/${itemId}.json`)
    .then((res) => res.data);
}
