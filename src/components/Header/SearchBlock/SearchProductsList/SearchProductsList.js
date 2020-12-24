import React from 'react'
import s from './searchproductslist.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createSetSearchListAction} from "../../../../redux/main-page-reducer";
import {createSubmitSearchListAction} from "../../../../redux/header-reducer";
import * as Scroll from 'react-scroll'
import {useHistory} from 'react-router-dom'

const scroll = Scroll.animateScroll;
const pub = `${process.env.PUBLIC_URL}/`;

export const SingleElementInSearchList = ({link, name, price, pic, ...props}) => {
    return (
        <Link to={`/product/${link}`} className={s.productCard}>
            <img src={pic ? `${pub}product_images/${pic}` : pub + 'image/no_photo.png'}
                 alt={name} width='50px' height='50px' className={s.img}/>
            <span className={s.name}>{name}</span>
            <span className={s.price}>{`${price} .руб`}</span>
        </Link>)

};

export default (props) => {
    const matches = useSelector(state => state.header.matchesList);
    const dispatch = useDispatch();
    let history = useHistory();
    const arrElements = matches.slice(0, 4).map(v => <SingleElementInSearchList {...v}/>);

    const showMore = () => {
        dispatch(createSetSearchListAction(matches));
        dispatch(createSubmitSearchListAction());
        scroll.scrollTo(120, {});
        history.push('/')
    };

    return (
        <div className={s.block}>
            {arrElements}
            {matches.length > 4 ? <button className={s.showMore} onClick={showMore}>Показать еще ...</button> : null}
        </div>
    )
}