import React, {useState} from 'react'
import s from './searchform.module.scss'
import {
    createClearMatchesListAction,
    createSearchStringAction,
    createSubmitSearchListAction
} from "../../../../redux/header-reducer";
import {useDispatch, useSelector} from "react-redux";
import {createSetSearchListAction} from "../../../../redux/main-page-reducer";
import * as Scroll from 'react-scroll';
import {useHistory} from "react-router-dom";
const scroll = Scroll.animateScroll;

const importSprite = {backgroundImage: `url(${process.env.PUBLIC_URL}/icon/spritesheet.png)`};

export default () => {
    let searchString = useSelector(state=>state.header.searchString);
    let productsList = useSelector(state=>state.mainPage.productsList);
    let matchesList = useSelector(state=>state.header.matchesList);
    let history = useHistory();
    const dispatch = useDispatch();

    const onChangeSearch = e => {
        const { value } = e.target;
        dispatch(createSearchStringAction(value, productsList))
    };

    const whenSubmitSearch = e => {
        e.preventDefault();
        dispatch(createSetSearchListAction(matchesList));
        dispatch(createSubmitSearchListAction());
        scroll.scrollTo(120, {});
        history.push('/')
    };

    const onBlurField = () => dispatch(createClearMatchesListAction());

    return (
        <div className={s.block}>
                <form action="" className={s.form} onSubmit={whenSubmitSearch}>
                    <input type="text" placeholder="    Поиск..."
                           name="searchFromProductsList" className={s.searchField}
                           value={searchString} onChange={onChangeSearch}
                           onBlur={()=>setTimeout(onBlurField, 400)}
                    autoComplete={'off'}/>
                    <button type="submit" className={s.searchButton}>
                        <div style={importSprite} className={s.btnImage} title="Поиск"/>
                    </button>
                </form>
        </div>
    )
}