import React, {useState} from 'react'
import s from './confirmationpurchase.module.scss'
import PurchaseForm from "./PurchaseForm/PurchaseForm";

export default () => {
    const [showForm, setShowForm] = useState(false);
    const toggleShowForm = () => setShowForm(!showForm);

    return (
        <div className={s.block}>
            {!showForm
                ? (<>
                    <button className={`${s.showFormBtn} closeBtn`}>Продолжить покупки</button>
                    <button className={s.showFormBtn} onClick={toggleShowForm}>Оформить заказ</button>
                    </>)
                : (<>
                    <h3>Заполните форму</h3>
                    <PurchaseForm />
                </>)}
        </div>
    )
}