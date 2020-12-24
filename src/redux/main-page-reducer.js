import {API} from "../api/Api";
import Translit from 'cyrillic-to-translit-js'
// constants list
const SET_PRODUCTS_LIST = 'SET_PRODUCTS_LIST';
const SORT_PRODUCT_LIST = 'SORT_PRODUCT_LIST';
const VIEW_MORE_PRODUCTS = 'VIEW_MORE_PRODUCTS';
const SORT_BY_CATEGORY = 'SORT_BY_CATEGORY';
const SORT_BY_DEFAULT = 'SORT_BY_DEFAULT';
const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
const REFRESH_PRODUCTS_LIST = 'REFRESH_PRODUCTS_LIST';
const LIST_SIZE = 24;
// start state
let initialState = {
    productsList: [],
    prepareToViewList: [],
    viewProductsList: [],
    parameters: {
        priceMargeRange: [[500, 1.3], [1000, 1.2], [Infinity, 1.1]]
    },
    existProductList: false,
    existMoreProducts: true,
    sortStatus: ['Новинки']
};
// main function
const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        // prepare and add products list to state
        case(SET_PRODUCTS_LIST):
            let data = _prepareData(action.list);
            let dataThunk = _getRandomProducts(data);
            return {
                ...state,
                productsList: data,
                prepareToViewList: data,
                viewProductsList: dataThunk,
                existProductList: true
            };
        case (REFRESH_PRODUCTS_LIST):
            return {
                ...state,
                prepareToViewList: state.productsList,
                viewProductsList: _createThunk(state.productsList),
                existMoreProducts: LIST_SIZE < state.productsList.length
            };
        case (SORT_BY_DEFAULT):
            let sortById = state.prepareToViewList.sort((a, b) => a.id - b.id);
            let forView = _createThunk(sortById);
            return {
                ...state,
                prepareToViewList: sortById,
                viewProductsList: forView,
                existMoreProducts: LIST_SIZE < sortById.length
            };
        case(SORT_PRODUCT_LIST):
            let sortedList = _sortProductByPriceAsc(state.prepareToViewList);
            if (action.direction === "desc") sortedList = sortedList.reverse();
            let listThunkForView = _createThunk(sortedList);
            return {
                ...state,
                prepareToViewList: sortedList,
                viewProductsList: listThunkForView,
                existMoreProducts: LIST_SIZE < sortedList.length
            };
        case (VIEW_MORE_PRODUCTS):
            let nextPart = _createThunk(state.prepareToViewList, state.viewProductsList.length);
            let exist_1 = true;
            if (state.prepareToViewList.length <= state.viewProductsList.length + LIST_SIZE) exist_1 = false;
            return {
                ...state,
                viewProductsList: [...state.viewProductsList, ...nextPart],
                existMoreProducts: exist_1
            };
        case (SORT_BY_CATEGORY):
            let {arrCategoriesId} = action;
            let arrCategoryProducts = state.productsList.filter(v => arrCategoriesId.includes(v.catId));
            let dataForView = _createThunk(arrCategoryProducts);
            let exist_2 = arrCategoryProducts > dataForView;
            return {
                ...state,
                prepareToViewList: arrCategoryProducts,
                viewProductsList: dataForView,
                existMoreProducts: exist_2,
                sortStatus: ['Новинки']
            };
        case (SET_SEARCH_LIST):
            return {
                ...state,
                prepareToViewList: action.searchList,
                viewProductsList: _createThunk(action.searchList),
                existMoreProducts: LIST_SIZE < action.searchList.length,
            };
        default:
            return state;
    }
};

export const createSetProductsListAction = (list) => ({type: SET_PRODUCTS_LIST, list});
export const createSortAction = (direction = 'asc') => ({type: SORT_PRODUCT_LIST, direction});
export const createViewMoreProducts = () => ({type: VIEW_MORE_PRODUCTS});
export const createSortByCategory = (arrCategories, findId) => {
    let arrCategoriesId = _getCategories(arrCategories, findId);
    if (arrCategoriesId) return ({type: SORT_BY_CATEGORY, arrCategoriesId});
    return ({type: 'ERROR'})
};
export const createSetSearchListAction = (list) => ({type: SET_SEARCH_LIST, searchList: list});
export const createSortByDefault = () => ({type: SORT_BY_DEFAULT});
export const createRefreshProductsListAction = () => ({type: REFRESH_PRODUCTS_LIST});
export const getProductsList = (dispatch) => {
    API.getProductsList()
        .then(response => {
            if (response) {
                dispatch(createSetProductsListAction(response));
            }
        });
};

export default mainPageReducer;

export const createPrice = (price, arrRange, arrIndex = 0, result = 0) => {
    if (price < arrRange[arrIndex][0]) {
        result = price * arrRange[arrIndex][1];
        result = Math.ceil(result);
        return result
    } else {
        return createPrice(price, arrRange, ++arrIndex)
    }
};

export const createLink = (name, id) => `${Translit().transform(name, "_")
    .toLowerCase().replace(/\//g, '')}_${id}`;

export function _prepareData(arr, range = initialState.parameters.priceMargeRange) {
    return arr.map(v => {
        return ({
            ...v,
            price: createPrice(v.price, range),
            link: createLink(v.name, v.id)
        })
    })
}
const _createThunk = (arr, start = 0, count = LIST_SIZE) => arr.slice(start, start + count);
const _sortProductByPriceAsc = (prodList) => {
    return prodList.sort((a, b) => a.price - b.price)
};
const _getCategories = (arr, id) => {
    const _findCategoryObj = (arr, id) => {
        /* Find on high level */
        let result = arr.find(v => v.id === id);
        /* Find deep to -1 level */
        if (!result) for (let el of arr) {
            let res;
            if (el.child) res = el.child.find(v2 => v2.id === id);
            if (res) {
                result = res;
                break
            }
        }
        if (result) {
            return result
        } else {
            return null
        }
    };
    let category = _findCategoryObj(arr, id);
    if (!category) return null;
    let arrCategories = [id];
    if (category.child) {
        category.child.forEach(v => {
            arrCategories.push(v.id);
            if (v.child) {
                v.child.forEach(v2 => {
                    arrCategories.push(v2.id);
                    if (v2.child) v2.child.forEach(v3 => arrCategories.push(v3.id))
                })
            }
        });
    }

    return arrCategories
};
// get random products from products list
const _getRandomProducts = (arr, count=LIST_SIZE) => {
    let result = [];
    while (result.length!==count){
        result.push(arr[Math.floor(Math.random()*arr.length)])
    }
    return  result
};