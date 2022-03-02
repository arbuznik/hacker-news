import React from 'react';
import { Route, Routes } from 'react-router-dom';

import News from '../News/News';
import Layout from '../Layout/Layout';
import NewsItem from '../NewsItem/NewsItem';
import NotFound from '../NotFound/NotFound';

const App = () => (
    <Routes>
      <Route path={'/'} element={<Layout/>}>
        <Route index element={<News/>}/>
        <Route path={':newsItemId'} element={<NewsItem/>}/>
      </Route>
      <Route path={'*'} element={<Layout/>}>
        <Route path={'*'} element={<NotFound/>}/>
      </Route>
    </Routes>
);

export default App;
