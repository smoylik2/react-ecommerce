import React from 'react'
import s from './basketfield.module.scss'
import ProductsBag from "../../../ProductsBag/ProductsBag";
import {useDispatch, useSelector} from "react-redux";
import {createToggleShowBasketActions} from "../../../../redux/basket-reducer";
const importSprite = {backgroundImage: `url(${process.env.PUBLIC_URL}/icon/spritesheet.png)`};

export default () => {
    let showBasket = useSelector(state=>state.basket.showBasket);
    let producsInBasketCount = useSelector(state=>state.basket.productsListLength);
    const dispatch = useDispatch();

    const changeBasketShow = () => dispatch(createToggleShowBasketActions());

    return (<div className={s.block}>
        <button className={s.basketBtn} onClick={changeBasketShow}>
            <div style={importSprite} className={s.basketLogo} title="Корзина"/>
            <h3 className={s.basketLabel}>Список покупок</h3>
            <p className={s.productCount}>{producsInBasketCount}</p>
        </button>
        {showBasket ? <ProductsBag/> : null}
    </div>)
}