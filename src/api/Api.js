import * as axios from "axios";

const rootURL = process.env.REACT_APP_MAIN_PAGE;

const instance = axios.create({
    withCredentials: true,
    baseURL: `${rootURL}/api/`,
    /*headers:     {
        "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    }*/
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
});

export const API = {
    getCategories() {
        return instance.get(`categories`)
            .then(response => {
                return response.data;
            });
    },
    getProductsList() {
        return instance.get(`products/list`)
            .then(res=>res.data)
    },
    getProductInfo(productId) {
        return instance.post(`single`, `productId=${productId}`)
            .then(res=>res.data)
    },
    sendOrder(contacts, productsList) {
        return instance.post(`order`,
            `consumerInfo=${JSON.stringify(contacts)}
            &productsList=${JSON.stringify(productsList)}`)
            .then(res=>res.data)
    },
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
};


