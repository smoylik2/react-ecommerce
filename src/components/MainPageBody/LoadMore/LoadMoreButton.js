import React, {useState, useEffect} from 'react'
import s from './loadmore.module.scss'
import {createViewMoreProducts} from "../../../redux/main-page-reducer";
import {useDispatch} from "react-redux";
import * as Scroll from 'react-scroll'

const scroll = Scroll.animateScroll;

export default () => {
    const dispatch = useDispatch();
    const loadMore = () => {
        dispatch(createViewMoreProducts());
        scroll.scrollMore(10);
    };

    return (
        <div className={s.block}>
            <button className={s.loadBtn} onClick={loadMore}>
                {`Показать еще ...`}
            </button>
        </div>
    )
}