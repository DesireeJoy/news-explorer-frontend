import { apiKey } from "./constants";


class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._apiKey = apiKey;
  }
  
 getNewsCards(request) {
        const date = new Date();
        const thisDate = date.toISOString();
        const pastDate = new Date(date.getTime() - (60 * 60 * 24 * 7 * 1000));
        const oneWeekAgo = pastDate.toISOString();


        return fetch(`${this._baseUrl}?q=${request}&from=${oneWeekAgo}&to=${thisDate}&sortBy=relevancy&pageSize=100&apiKey=${this._apiKey}`
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(res.status));
            })
            .then(res => res.articles);
    }
}


export default NewsApi;