import React from 'react'
import s from './googlemaps.module.scss'

export default () => {
    return (
        <div className={s.block}>
            <iframe width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="16px"
                    marginWidth="16px"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=lugansk&t=k&z=11&ie=UTF8&iwloc=&output=embed"/>
        </div>
    )
}
