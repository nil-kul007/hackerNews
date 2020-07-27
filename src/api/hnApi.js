export function hnApi(http) {
  return {
    all: page => {
      return http.get(`?page=${page}`);
    },

    create: (newHN, page) => {
      return http.post('/api/hn', newHN);
    }
  };
}
