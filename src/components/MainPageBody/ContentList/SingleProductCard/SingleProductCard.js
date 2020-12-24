import React from 'react'
import s from './singleproductcard.module.scss'
import {Link} from "react-router-dom";

export default ({img, title, price, link}) => {
    const pub = `${process.env.PUBLIC_URL}/`;
    return (
        <div className={s.block}>
            <Link to={`/product/${link}`} className={s.linkBlock}>
                <img src={img
                            ?`${pub}product_images/${img}`
                            :`${pub}image/no_photo.png`}
                     alt={title} className={s.productImg}/>
                <h3 className={s.productName}>{title}</h3>
            </Link>
            <span className={s.price}>{price} .руб</span>
        </div>
    )
}