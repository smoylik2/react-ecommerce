import React, {useState, useEffect} from 'react'
import s from './slider.module.scss'
import {useSelector} from "react-redux";


export default (props) => {
    /* URL to public folder */
    const pb = `${process.env.PUBLIC_URL}/image/slider/`;

    const arrLinksToImage = useSelector(state => state.header.slider.arrLinksToPhoto);

    const [state, setState] = useState({
        arrSlides: arrLinksToImage,
        slideIndex: 0
    });

    /* Subscribe even render to setTimeout for auto show slides*/
    useEffect(() => {
        const timer = setTimeout(nextSlide, 100000);
        return () => clearTimeout(timer)
    });
    /* Create array with slides as elements */
    let slidesList = state.arrSlides.map((v, i, a) => (
        <div className={`${state.slideIndex === i ? s.active : s.mySlides} ${s.fade}`} key={`${v}_${i}`}>
            <div className={s.numbertext}>{`${i + 1} / ${a.length}`}</div>
            <img alt={`Простор-лнр`} src={`${pb + v}`} style={{width: "100%", display: 'block'}}/>
        </div>
    )) || null;
    /* Create array with dots markup*/
    let dotList = state.arrSlides.map((v, i, a) => (
        <span className={i !== state.slideIndex ? s.dot : `${s.dot} ${s.active}`} onClick={() => showSlide(i)}
              key={i * i}/>
    ));

    const nextSlide = () => {/* Get next slides*/
        // if it's a last element -> to first else -> go to next
        state.arrSlides.length - 1 === state.slideIndex
            ? setState(prev => ({...prev, slideIndex: 0}))
            : setState(prev => ({...prev, slideIndex: state.slideIndex + 1}));

    };

    const prevSlide = () => {/*Get preview slides*/
        state.slideIndex === 0
            ? setState(prev => ({...prev, slideIndex: state.arrSlides.length - 1}))
            : setState(prev => ({...prev, slideIndex: state.slideIndex - 1}))
    };

    const showSlide = (i) => {/*Show slides from number*/
        if (i >= 0 && i < state.arrSlides.length) {
            setState(prev => ({...prev, slideIndex: i}))
        }
    };

    return (
        <div className={s.block}>

            {slidesList}

            <a className={s.prev} onClick={prevSlide}>&#10094;</a>
            <a className={s.next} onClick={nextSlide}>&#10095;</a>
            <div style={{}} className={s.dotBlock}>
                {dotList}
            </div>
        </div>
    )
}