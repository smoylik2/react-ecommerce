import React, {useCallback} from 'react'
import s from './productsbag.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    createChangeCountActions,
    createDeleteProductFromIdActions,
    createToggleShowBasketActions
} from "../../redux/basket-reducer";
import BasketSingleProduct from "./BasketSingleProduct/BasketSingleProduct";
import ConfirmationPurchase from "./ConfirmationPurchase/ConfirmationPurchase";

export default () => {
    const dispatch = useDispatch();
    const basketProducts = useSelector(state=>state.basket.productsList);
    const orderLoad = useSelector(state=>state.basket.orderDidLoaded);
    const sumOfList = basketProducts.length>0
        ? <h3 style={{textAlign: "right"}}>Сумма: {
            basketProducts.reduce((t,v)=>t+(v.price*v.count), 0).toFixed()} .руб</h3>
        : null;

    const closeBasket = (e) => {
        if (e.target.className.includes('jacket')||e.target.className.includes('closeBtn')) {
            dispatch(createToggleShowBasketActions())
        }
    };
    const deleteProduct = useCallback(e => dispatch(
        createDeleteProductFromIdActions(e.target.dataset.article))
        , []);
    const changeCount = useCallback(e => {
        const count = e.target.value;
        const id = e.target.dataset.article;
        if(count>=0&&count<100)dispatch(createChangeCountActions( id, count));
    }, []);

    let productList = basketProducts.length
        ? basketProducts.map(v => <BasketSingleProduct {...{...v, deleteProduct, changeCount}}/>)
        : null;

    return (<div className={s.jacket} onClick={closeBasket}>
                <div className={s.block}>
                    <button className={s.closeBtn}>x</button>
                    {orderLoad ? (<h3>Спасибо, ваша заявка принята!<br/>
                        Мы свяжемся с вами в ближайшее время</h3>) : null}
                    {productList
                        ? <h3>Список товаров:</h3>
                        : (!orderLoad
                            ? <h3>Корзина пуста ...</h3>
                            : null)
                    }
                    {productList}
                    {sumOfList}
                    {productList ? <ConfirmationPurchase /> : null}
                </div>
            </div>
    )
}