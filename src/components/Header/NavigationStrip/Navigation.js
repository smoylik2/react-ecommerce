import React, {useEffect, useMemo} from 'react'
import s from './navigation.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getCategoriesList} from '../../../redux/header-reducer'
import {Link} from "react-router-dom";
import Translit from 'cyrillic-to-translit-js'
import * as Scroll from 'react-scroll'

const bkgMobile = `${process.env.PUBLIC_URL}/image/background_mobile.jpg`;
const scroll = Scroll.animateScroll;

const toTop = () => scroll.scrollToTop({duration:300});

const createDropdownList = (arr) => {
    if(arr.length<1) return null;
    return arr.map(v => {
        return (<div className={s.dropdown}>
            <button className={s.dropBtn}>{v.text}</button>
            <div className={s.dropdownContent}>
                {v.child.map(v2 => <Link
                    to={`/categories/${Translit().transform(v2.text, '_').toLowerCase()}_${v2.id}`}
                    className={s.linkJacket}
                    onClick={toTop}>
                    <button className={s.linkBtn}
                            data-id={v2.id}>{v2.text}</button></Link>)}
                <Link to={`/categories/${Translit().transform(v.text, '_').toLowerCase()}_${v.id}`}
                      className={s.linkJacket}
                      onClick={toTop}>
                    <button className={s.viewAll} data-id={v.id}>Смотреть все</button></Link>
            </div>
        </div>)
    })
};
export default () => {
    let categoriesList = useSelector(state => state.header.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        getCategoriesList(dispatch)
    }, []);

    let arrElements = useMemo(()=>createDropdownList(categoriesList), [categoriesList]);

    return (
        <div className={s.jacket} style={{backgroundImage:`url(${bkgMobile})`}}>
            <div className={s.block}>
                {arrElements}
            </div>
        </div>
    )
}