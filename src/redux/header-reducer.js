import {API} from "../api/Api";
import searchFunction from "../utils/searchFunction";

const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
const SET_SEARCH_STRING = 'SET_SEARCH_STRING';
const SUBMIT_SEARCH_LIST = 'SUBMIT_SEARCH_LIST';
const CLEAR_MATCH_LIST = 'CLEAR_MATCH_LIST';

let initialState = {
    topStripInfo: {
        mts: '+38-095-800-56-59',
        lugacom: '072-138-53-53',
        olx: 'olx.ua/list/user/J81L',
        email: 'prostor.lnr@gmail.com',
        graphic: 'с 8:00 до 21:00'
    },
    slider: {
        arrLinksToPhoto:['slide_1.jpg', "slide_2.jpg", "slide_1.jpg", "slide_2.jpg"]
    },
    categories:[],
    searchString: '',
    matchesList: []
};

const headerReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_CATEGORIES_LIST:
            return {...state, categories: action.data};
        case SET_SEARCH_STRING:
            let {text, arrList} = action;
            let searchKeys = ['name','id'];
            let match = searchFunction(text, arrList, searchKeys);
            return {...state, searchString: text, matchesList: match};
        case (SUBMIT_SEARCH_LIST):
            return {
                ...state,
                searchString: '',
                matchesList: []
            };
        case (CLEAR_MATCH_LIST):
            return {
                ...state,
                matchesList: []
            };
        default:
            return state;
    }
};

export const setCategoriesList = (data) => ({type: SET_CATEGORIES_LIST, data});
export const createSearchStringAction = (text, arrList) => ({type: SET_SEARCH_STRING, text, arrList});
export const createSubmitSearchListAction = (dispatch) => ({type: SUBMIT_SEARCH_LIST, dispatch});
export const createClearMatchesListAction = () => ({type: CLEAR_MATCH_LIST});


export const getCategoriesList = (dispatch) =>{
    API.getCategories()
        .then(response => {
            if (response) {
                dispatch(setCategoriesList( response));
            }
        });
};

export default headerReducer;