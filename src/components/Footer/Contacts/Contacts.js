import React from 'react'
import s from './contacts.module.scss'
import {useSelector} from "react-redux";
const importSprite = {backgroundImage: `url(${process.env.PUBLIC_URL}/icon/spritesheet.png)`};

export default () => {
    let objInfo = useSelector(store => store.header.topStripInfo);

    return (
        <div className={s.block}>
            <div>
                <div className={s.infoTitle}><h2>Контакты:</h2></div>
                <div className={s.infoElement}>{objInfo.mts}</div>
                <div className={s.infoElement}>{objInfo.lugacom}</div>
                <div className={s.infoElement}>{objInfo.email}</div>
            </div>
            <div>
                <div className={s.infoTitle}><h2>Медиа:</h2></div>
                <div className={s.social}>
                    <a href="https://www.vk.com" target="_blank">
                        <div style={importSprite} className={`${s.socialIcon} ${s.vk}`} title='vk.com'/>
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <div style={importSprite} className={`${s.socialIcon} ${s.instagramm}`} title='instagram.com'/>
                    </a>
                    <a href="https://www.olx.ua" target="_blank">
                        <div style={importSprite} className={`${s.socialIcon} ${s.olx}`} title='olx.ua'/>
                    </a>
                </div>
            </div>
        </div>
    )
}