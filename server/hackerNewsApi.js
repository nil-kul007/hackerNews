import { Router } from 'express';

export const hackerNews = () => {
  const hackerNews = new Router();
  const news = [];
  news.push({ name: 'Anil Test' });
  news.push({ name: 'Anil ' });

  hackerNews.get('/api/hn', (_req, res) => {
    setTimeout(() => {
      res.json(news);
    }, 300);
  });

  hackerNews.post('/api/hn', (req, res) => {
    const newNews = req.body;
    news.push(newNews);
    setTimeout(() => {
      res.json(newNews);
    }, 100);
  });

  return hackerNews;
};
