import React from 'react'
import s from './loadersingleproduct.module.scss'


export default () => {
    return (<div className={s.block}>
        <div className={s.photo}/>
        <div className={s.infoBlock}>
            <div className={s.infoHeader}/>
            <div className={s.infoArticle}/>
            <div className={s.infoDescription}/>
        </div>
    </div>)
}

