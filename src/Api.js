class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru"
        this.token = token
        this.parseJSON = res => res.json()
    }

    setHeaders(isContentType = false) {
        const headers = {
            "Authorization": `Bearer ${this.token}`
        }
        if (isContentType) {
            headers["Content-Type"] = "application/json"
        }
        return headers
    }
    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    getSingleProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    updSingleProduct(id, body) {
        return fetch(`${this.path}/products/${id}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(this.parseJSON)
    }
    delSingleProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: "DELETE",
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(this.parseJSON)
    }
    setLike(id, isLike) {
        return fetch(`${this.path}/products/likes/${id}`, {
            method: isLike ? "PUT" : "DELETE",
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    setReview(id, body) {
        return fetch(`${this.path}/products/review/${id}`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(this.parseJSON)
    }
    delReview(id, r_id) {
        return fetch(`${this.path}/products/review/${id}/${r_id}`, {
            method: "DELETE",
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    getReview(id) {
        return fetch(`${this.path}/products/review/${id}`, {
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    getUsers() {
        return fetch(`${this.path}/users`, {
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    getSingleUser(id) {
        return fetch(`${this.path}/users/${id}`, {
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    getAdmin() {
        return fetch(`${this.path}/users/me`, {
            headers: this.setHeaders()
        }).then(this.parseJSON)
    }
    updAdmin(body, changeImg = false) {
        return fetch(`${this.path}/users/me${changeImg ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(this.parseJSON)
    }
    register(body) {
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(this.parseJSON)
    }
    auth(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: this.setHeaders(true),
            body: JSON.stringify(body)
        }).then(this.parseJSON)
    }
}

export default Api