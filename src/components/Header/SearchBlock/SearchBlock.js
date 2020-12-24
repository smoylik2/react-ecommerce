import React from 'react'
import s from './searchblock.module.scss'
import SearchForm from "./SearchForm/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import SearchProductsList from "./SearchProductsList/SearchProductsList";
import {Link} from "react-router-dom";
import {createRefreshProductsListAction} from "../../../redux/main-page-reducer";
import BasketField from "./BasketField/BasketField";

export default () => {
    let searchBlock = useSelector(state=>state.header.matchesList.length) || null;
    const dispatch = useDispatch();
    return (<div className={s.block}>
            <Link to={'/'} onClick={()=>dispatch(createRefreshProductsListAction())} className={s.bigLogo}>
                <div className={s.imgLogo} style={{backgroundImage: `url('${process.env.PUBLIC_URL}/image/main_logo.png')`}}>
                </div>
            </Link>
            <div className={s.search}>
                <SearchForm/>
                {searchBlock && <SearchProductsList/>}
            </div>
            <div className={s.bag}>
                <BasketField/>
            </div>
        </div>
    )
}