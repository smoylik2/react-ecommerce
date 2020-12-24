import React from 'react'
import s from './footer.module.scss'
import Contacts from "./Contacts/Contacts";
import GoogleMaps from "./GoogleMaps/GoogleMaps";

export default (props) => {
    return (
        <div className={s.block}>
            <Contacts />
            <GoogleMaps />
            <div className={s.copyright}>
                © 2021 Prostor lnr. Все права защищены.
            </div>
        </div>
    )
}