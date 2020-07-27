import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './Head';

const LoadableHackerNews = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'hackernews' */ './hackerNews/HackerNews'),
  loading: () => <div>Loading...</div>
});

//const id=1;

const App = () => (
  <div className="app">
    <Head />
    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHackerNews} />
        <Route path="/HackerNews/:id" component={LoadableHackerNews} />
      </Switch>
    </main>
  </div>
);

export default App;
