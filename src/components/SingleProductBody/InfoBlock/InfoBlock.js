import React from 'react'
import s from './infoblock.module.scss'
import {createAddToBagProductAction} from "../../../redux/basket-reducer";
import {useDispatch, useSelector} from "react-redux";
const importSprite = {backgroundImage: `url(${process.env.PUBLIC_URL}/icon/spritesheet.png)`};

function decodeHtmlCharCodes(str) {
    return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
        return String.fromCharCode(charCode);
    }).replace(/<br \/>/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"');
}

const paramBlackList = ['НаименованиеДляСайта', 'Средний рейтинг', 'Дата последнего изменения рейтинга'];

export default ({id, name, description = '', price, param, ...props}) => {
    const productsList = useSelector(state=>state.mainPage.productsList);
    const dispatch = useDispatch();
    const prepareDescription = decodeHtmlCharCodes(description);
    let prepareParameters = [];
    if (Array.isArray(param)) {
        prepareParameters = param.filter(v => !paramBlackList.includes(v._name))
            .map(v => (<tr className={s.tblRow}>
                <td className={s.tblCeil}>{v._name}</td>
                <td className={s.tblCeil}>{v.__text.includes('.')
                    ? Number.parseFloat(v.__text)
                    : v.__text}</td>
            </tr>));
    }
    const addToBag = () => dispatch(createAddToBagProductAction(productsList.find(v=>v.id===id)));

    return (
        <div className={s.block}>
            <h3 className={s.title}>{name}</h3>
            <span className={s.article}>Артикул: {id}</span>
            <p className={s.description}>{prepareDescription}</p>
            <span className={s.price}>{price} .руб</span>
            <button className={s.btnBuy} onClick={addToBag}>
                <div style={importSprite} className={s.imgBuy} title="Купить"/>
                <span>Купить</span>
            </button>
            <table className={s.parametersTable}>
                {prepareParameters}
            </table>
        </div>
    )
}