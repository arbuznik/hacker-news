import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNews, getNewsItem } from './api';

const getDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
}

const getHumanReadableTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export const fetchNews = createAsyncThunk('news/fetchBooks', async (arg, { getState }) => {
  const state = getState();
  const { resultsPerPage } = state.news;

  const response = await getNews();

  const numberOfNews = response.data.slice(0, resultsPerPage);

  const newsItems = await Promise.all(numberOfNews.map(getNewsItem));

  newsItems.forEach(newsItem => {
    newsItem.dateTime = getDateTime(newsItem.time)
    newsItem.humanReadableTime = getHumanReadableTime(newsItem.time)
  });

  console.log(newsItems);
  return newsItems;
});

export const fetchNewsItem = createAsyncThunk('news/fetchNewsItem', async ({ newsItemId }) => {
  console.log(newsItemId);
  const newsItem = await getNewsItem(newsItemId);

  if (newsItem) {
    newsItem.dateTime = getDateTime(newsItem.time)
    newsItem.humanReadableTime = getHumanReadableTime(newsItem.time)

    return newsItem;
  }
});

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    item: {},
    items: [],
    resultsPerPage: 4,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateNewsItem: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNewsItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchNewsItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateNewsItem } = newsSlice.actions;

export const selectNewsItem = (state) => state.news.item;
export const selectNewsItems = (state) => state.news.items;
export const selectStatus = (state) => state.news.status;
export const selectError = (state) => state.news.error;

export default newsSlice.reducer;
