import {API} from '../api/Api'

const SET_NEW_PRODUCT = 'SET_NEW_PRODUCT';
const DELETE_INFO = 'DELETE_INFO';

let initialState = {
    productInfo: {}
};

const singleProdReducer = (state = initialState, action) => {
    switch (action.type){
        case (SET_NEW_PRODUCT):
            return {
              ...state,
              productInfo: action.productInfo
            };
        case (DELETE_INFO):
            return {
              ...state,
              productInfo: {}
            };
        default:
            return state;
    }
}

const createSetNewProductAction = (productInfo) => ({type:SET_NEW_PRODUCT, productInfo});
export const createDeleteInfoAction = () => ({type: DELETE_INFO});

export const getProductInfo = (dispatch, prodId) =>{
    API.getProductInfo(prodId)
        .then(response => {
            if (response) {
                dispatch(createSetNewProductAction( response));
            }
        });
};

export const getCategoryText = (id, list) => {
    console.log('Cat')
    return JSON.stringify(list).split(`"id":"${id}"`)[1]
                                .split(`"text":"`)[1].split('"')[0]
};

export default singleProdReducer;