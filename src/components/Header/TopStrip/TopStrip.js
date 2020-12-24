import React from 'react'
import s from './topstrip.module.scss'
import { useSelector } from 'react-redux'

const importSprite = {backgroundImage: `url(${process.env.PUBLIC_URL}/icon/spritesheet.png)`};

export default () => {
    const info = useSelector(state=>state.header.topStripInfo);

    return (
        <div className={s.block}>
            <div className={s.thunk}>
                <h3 className={`${s.lableFor} ${s.text}`}>Наши контакты:</h3>
                <div style={importSprite} className={`${s.icons} ${s.sprite_mts}`}/>
                <div style={importSprite} className={`${s.icons} ${s.sprite_viber}`}/>
                <div style={importSprite} className={`${s.icons} ${s.sprite_whatsapp}`}/>
                <div style={importSprite} className={`${s.icons} ${s.sprite_tme}`}/>
                <div className={`${s.text}`}>{info.mts}</div>
            </div>
            <div className={s.thunk}>
                <div style={importSprite} className={`${s.icons} ${s.sprite_lugacom}`}/>
                <div className={`${s.text}`}>{info.lugacom}</div>
            </div>
            <div className={s.thunk}>
                <div style={importSprite} className={`${s.icons} ${s.sprite_olx}`}/>
                <div className={`${s.text}`}>{info.olx}</div>
            </div>
            <div className={s.thunk}>
                <div style={importSprite} className={`${s.icons} ${s.sprite_email}`}/>
                <div className={`${s.text}`}>{info.email}</div>
            </div>
            <div className={s.thunk}>
                <div style={importSprite} className={`${s.icons} ${s.sprite_time}`}/>
                <h3 className={`${s.lableFor} ${s.text}`}>Время работы:</h3>
                <div className={`${s.graphic} ${s.text}`}>{info.graphic}</div>
            </div>
        </div>
    )
}