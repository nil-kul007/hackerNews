import { httpClient } from './httpClient';
import { hnApi } from './hnApi';

export function apiFactory(http) {
  return {
    news: hnApi(http)
  };
}

const http = httpClient('http://localhost:3000');
const hnHTTP = httpClient('https://hn.algolia.com/api/v1/search_by_date');
export const api = apiFactory(http);
export const hnAPI = apiFactory(hnHTTP);
