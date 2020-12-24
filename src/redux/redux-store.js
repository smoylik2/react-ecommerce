import {applyMiddleware, combineReducers, createStore} from "redux";
import headerReducer from "./header-reducer";
import mainPageReducer from "./main-page-reducer";
import singleProductReducer from "./single-product-reducer";
import footerReducer from "./footer-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import basketReducer from "./basket-reducer";

let reducers = combineReducers({
    header: headerReducer,
    mainPage: mainPageReducer,
    singleProduct: singleProductReducer,
    footer: footerReducer,
    basket: basketReducer,
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;