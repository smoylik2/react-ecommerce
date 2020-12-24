import {API} from "../api/Api";

const TOGGLE_SHOW_BASKET = 'TOGGLE_SHOW_BASKET';
const DELETE_PRODUCT_FROM_ID = 'DELETE_PRODUCT_FROM_ID';
const CHANGE_COUNT = 'CHANGE_COUNT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const SEND_ORDER = 'SEND_ORDER';

const savedData = JSON.parse(localStorage.getItem('basketList')) || [];

let initialState = {
    productsList: savedData || [],
    showBasket: false,
    orderDidLoaded: false,
    productsListLength: savedData.length || 0
};

const basketReducer = (state = initialState, action) => {
    switch (action.type){
        case (TOGGLE_SHOW_BASKET):
            _writeToLocaleStore('basketList', state.productsList);
            return {
                ...state,
                orderDidLoaded: false,
                showBasket: !state.showBasket
            };
        case (DELETE_PRODUCT_FROM_ID):
            return {
                ...state,
                productsList: state.productsList.filter(v => v.id !== action.id),
                productsListLength: --state.productsListLength
            };
        case (CHANGE_COUNT):
            return {
                ...state,
                productsList: state.productsList.map(v => v.id === action.id
                    ? {...v, count: +action.count}
                    : v)
            };
        case (ADD_PRODUCT):
            let newArrProduct = state.productsList.find(v=>v.id===action.objProduct.id)
                ? state.productsList.map(v=>v.id===action.objProduct.id
                    ? {...v, count: v.count<99 ? ++v.count : v.count}
                    : v)
                : [...state.productsList, {...action.objProduct, count: 1}];
            _writeToLocaleStore('basketList', newArrProduct);
            return {
                ...state,
                productsList: newArrProduct,
                showBasket: !state.showBasket,
                productsListLength: newArrProduct.length===state.productsListLength
                    ? state.productsListLength
                    : ++state.productsListLength
            };
        case (SEND_ORDER):
            API.sendOrder(action.info, state.productsList);
            return {
                ...state,
                productsList: [],
                productsListLength: 0,
                orderDidLoaded: true
            };
        default:
            return state;
    }
};

export const createToggleShowBasketActions = () => ({type: TOGGLE_SHOW_BASKET});
export const createDeleteProductFromIdActions = (id) => ({type: DELETE_PRODUCT_FROM_ID, id});
export const createChangeCountActions = (id, count) => ({type: CHANGE_COUNT, id, count});
export const createAddToBagProductAction = (objProduct) => ({type: ADD_PRODUCT, objProduct});
export const createSendOrderToServerAction = (info) => ({type: SEND_ORDER, info});

export default basketReducer;

const _writeToLocaleStore = (name, data) => localStorage.setItem(name, JSON.stringify(data));