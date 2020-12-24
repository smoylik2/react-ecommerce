import React, {useState} from 'react'
import s from './photoblock.module.scss'
const path = `${process.env.PUBLIC_URL}/product_images/`;

export default ({pictures, ...props}) => {

    let preparePhotoLinks = [...new Set(pictures.map(v=>v.split('/').pop()))];
    const [bigPhoto, setBigPhoto] = useState(preparePhotoLinks[0]);

    const setNewBigPhoto = e => setBigPhoto(e.target.src.split('/').pop());

    let arrPhotosList = preparePhotoLinks.map(v=> <img src={path+v}
                                                       alt={props.title}
                                                       key={v}
                                                       className={v!==bigPhoto
                                                                    ? s.smallPhoto
                                                                    : s.smallPhotoActive}
                                                        onClick={setNewBigPhoto}/>);

    return (
        <div className={s.block}>
            <div className={s.picList}>
                {arrPhotosList}
            </div>
            <div className={s.largePhoto}>
                <img src={path+bigPhoto} alt={props.title} className={s.bigPhoto}/>
            </div>
        </div>
    )
}