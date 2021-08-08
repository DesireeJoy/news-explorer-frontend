const token = localStorage.getItem("token");
class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(this._baseUrl + 'users/me', {
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`)
            })
    }

    

    // getArticles() {
    //     return fetch(this._baseUrl + "articles", {
    //         method: "GET",
    //         headers: this._headers
    //     })
    //         .then(res => { return res.json() }
    //         )
    // }

    // saveArticle({ title, description, url, urlToImage, publishedAt, keyword, source }) {
    //     return fetch(this._baseUrl + 'articles', {
    //         method: "POST",
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             title,
    //             description,
    //             url,
    //             urlToImage,
    //             publishedAt,
    //             keyword,
    //             source
    //         })
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();//this makes object out of response
    //             }
    //             return Promise.reject(`Error: ${res.status}`)
    //         })
    // }

    // removeArticle(articleId) {
    //     return fetch(this._baseUrl + 'articles/' + articleId, {
    //         method: "DELETE",
    //         headers: this._headers
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();//this makes object out of response
    //             }
    //             return Promise.reject(`Error: ${res.status}`)
    //         })
    // }

    register(email, password, username) {
        return fetch(this._baseUrl + 'signup', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password, username })
        })
            .then((res) => {
                    return res.json();
           
            })
    }

    authorize(email, password) {
        return fetch(this._baseUrl + 'signin', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                return res.json()
            })
    }

    checkToken(token) {
      console.log("Token is " + token)
        return fetch(this._baseUrl + 'users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => res.json())
            .then(data => data)
    }


  
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.desinews.students.nomoreparties.site/',
    headers: {
      'Accept': "application/json",
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}
});