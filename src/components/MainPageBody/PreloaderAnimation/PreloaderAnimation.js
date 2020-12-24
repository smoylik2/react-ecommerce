import React from 'react'
import s from './preloaderanimation.module.sass'

const SingleElement = () => {

    return (
        <div className={s.post}>
            <div className={s.photo }/>
            <div className={s.description}/>
            <div className={s.price}/>
        </div>
    )
};



export default () => {

    let arrElements = new Array(12).fill(<SingleElement/>);

    return (
        <div className={s.block}>
            {arrElements}
        </div>
    )
}