import React from 'react'
import s from './purchaseform.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {createSendOrderToServerAction} from "../../../../redux/basket-reducer";
import {useDispatch} from "react-redux";

export default () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            phone: '',
            comment: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(3, '*Введите имя')
                .max(50, '*Не более 50 символов')
                .required('*Обязательное поле'),
            phone: Yup.string()
                .min(10, '*Введите номер')
                .max(30, '*Не более 30 символов')
                .required('*Обязательное поле')
                .matches(/(072|050|095|067)/, '*Введите номер корректно'),
            comment: Yup.string().max(1000)
        }),
        onSubmit: values => {
            values.comment = values.comment || 'пусто';
            dispatch( createSendOrderToServerAction(values))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={s.block}>
            <label htmlFor="firstName">Ваше имя*</label>
            <input
                id="firstName" className={s.inputField}
                type="text" {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName
                ? (<div className={s.lineError}>{formik.errors.firstName}</div>)
                : null}
            <label htmlFor="phone">Телефон(-ы)*</label>
            <input id="phone" className={s.inputField}
                   type="text" {...formik.getFieldProps('phone')} />
            {formik.touched.phone && formik.errors.phone
                ? (<div className={s.lineError}>{formik.errors.phone}</div>)
                : null}
            <label htmlFor="email">Коментарий</label>
            <textarea id="comment" className={s.inputField}
                   {...formik.getFieldProps('comment')} />
            {formik.touched.comment && formik.errors.comment
                ? (<div className={s.lineError}>{formik.errors.comment}</div>)
                : null}
            <button type="submit" className={s.subBtn}>Отправить заказ</button>
        </form>
    );
};