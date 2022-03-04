import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNews, getNewsItem } from './api';
import { mockData } from "../components/Comments/mockData";

const getDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString();
}

const getHumanReadableTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const populateItemsWithTime = (items) => {
  items.forEach(item => {
    item.dateTime = getDateTime(item.time);
    item.humanReadableTime = getHumanReadableTime(item.time);
  });

  return items;
}

async function getItemsByIds(itemIds) {
  return await Promise.all(itemIds.map(getNewsItem));
}

export const fetchNews = createAsyncThunk('news/fetchBooks', async (arg, { getState }) => {
  const state = getState();
  const { category, resultsPerPage } = state.news;

  const response = await getNews(category);
  const newsToLoad = response.data.slice(0, resultsPerPage);

  let newsItems = await getItemsByIds(newsToLoad);
  newsItems = populateItemsWithTime(newsItems);

  console.log(newsItems);
  return newsItems;
});

export const fetchComments = createAsyncThunk('news/fetchComments', async (arg, { getState }) => {
  const state = getState();
  const { kids } = state.news.item;

  let queue = [...kids];
  let visited = new Set(queue);
  let allComments = [];

  while (queue.length > 0) {
    const currentComment = await getNewsItem(queue.shift());
    allComments.push(currentComment);

    const childComments = currentComment.kids;

    if (childComments) {
      childComments.forEach(child => {
        if (!visited.has(child)) {
          visited.add(child)
          queue.push(child)
        }
      })
    }
  }

  let aliveComments = allComments.filter(comment => !comment.dead && !comment.deleted);
  aliveComments = populateItemsWithTime(aliveComments);

  return aliveComments;
})

export const fetchNewsItem = createAsyncThunk('news/fetchNewsItem', async ({ newsItemId }) => {
  const newsItem = await getNewsItem(newsItemId);

  if (newsItem) {
    newsItem.dateTime = getDateTime(newsItem.time)
    newsItem.humanReadableTime = getHumanReadableTime(newsItem.time)

    console.log(newsItem)
    return newsItem;
  }
});

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    item: {
      comments: [...mockData],
    },
    items: [],
    category: 'newstories',
    resultsPerPage: 10,
    status: 'idle',
    error: null,
    commentsStatus: 'idle',
    commentsError: null,
  },
  reducers: {
    updateNewsItem: (state, action) => {
      state.item = action.payload;
    },
    updateCategory: (state, action) => {
      state.category = action.payload;
    },
    updateResultsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
    }
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
        state.item = {...state.item, ...action.payload};
      })
      .addCase(fetchNewsItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus = 'succeeded';
        state.item.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus = 'failed';
        state.commentsError = action.error.message;
      })
  },
});

export const { updateNewsItem, updateCategory, updateResultsPerPage } = newsSlice.actions;

export const selectNewsItem = (state) => state.news.item;
export const selectNewsItems = (state) => state.news.items;
export const selectCategory = (state) => state.news.category;
export const selectResultsPerPage = (state) => state.news.resultsPerPage;
export const selectStatus = (state) => state.news.status;
export const selectError = (state) => state.news.error;
export const selectCommentsStatus = (state) => state.news.commentsStatus;
export const selectCommentsError = (state) => state.news.commentsError;

export default newsSlice.reducer;
