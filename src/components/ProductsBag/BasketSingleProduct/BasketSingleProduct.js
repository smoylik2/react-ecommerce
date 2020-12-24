import React from 'react'
import s from './basketsingleproduct.module.scss'
import {SingleElementInSearchList} from "../../Header/SearchBlock/SearchProductsList/SearchProductsList";
import {createLink} from "../../../redux/main-page-reducer";

const BasketProductCount = ({count, id, deleteProduct, changeCount}) => {
  return (<div className={s.prodCount}>
      <span className={s.countTitle}>&nbsp;x&nbsp;{count}</span>
      <div className={s.calcBlock}>
          <button className={s.manipulationBtn} value={-1+count}
                  onClick={changeCount} data-article={id}>-</button>
          <input type="text" value={count} className={s.inputCount}
                 onChange={changeCount} data-article={id}/>
          <button className={s.manipulationBtn} value={1+count}
                  onClick={changeCount} data-article={id}>+</button>
          <button className={s.deleteBtn} data-article={id} onClick={deleteProduct}>Удалить</button>
      </div>
  </div>)
};


export default ({id, name, price, pic, count, deleteProduct, changeCount}) => {
    const linkProd = `${createLink(name, id)}`;

    return (
        <div className={s.block}>
            <div className={s.prodInfo}>
                <SingleElementInSearchList {...{name, price, link: linkProd, pic}}/>
            </div>
            <BasketProductCount {...{id, count, deleteProduct, changeCount}}/>
        </div>
    )
}