import React, {useEffect} from 'react'
import s from './singleproductcontent.module.scss'
import {useParams} from 'react-router-dom'
import {createPrice, getProductsList} from "../../redux/main-page-reducer";
import {useDispatch, useSelector} from "react-redux";
import {createDeleteInfoAction, getProductInfo} from "../../redux/single-product-reducer";
import PhotoBlock from "./PhotoBlock/PhotoBlock";
import InfoBlock from "./InfoBlock/InfoBlock";
import * as Scroll from 'react-scroll'
import LoaderSingleProduct from "./LoaderSingleProduct/LoaderSingleProduct";
import Helmet from "react-helmet";

const scroll = Scroll.animateScroll;

export default (props) => {
    const dispatch = useDispatch();
    let existContent = useSelector(state=>state.mainPage.existProductList);
    let priceRange = useSelector(state=>state.mainPage.parameters.priceMargeRange);
    let productInfo = useSelector(state=>state.singleProduct.productInfo);
    const existInfo = !!productInfo.name;

    scroll.scrollToTop({delay:0, smooth:false, duration:0});
    useEffect(()=>{
        if(!existContent)getProductsList(dispatch)
    }, [existContent]);

    const {prodId} = useParams();
    let articleNumber = prodId.split('_').pop();

    let {id,name,picture, description, price, param} = productInfo;

    let donePrice = price>0 ? createPrice(price, priceRange) : 0;

    useEffect(()=>{
        getProductInfo(dispatch, articleNumber);
        return dispatch(createDeleteInfoAction())
    }, [prodId]);

    return (
        <div className={s.block}>

            {existInfo
                ?(<>
                    <Helmet>
                        <title>{name}</title>
                        <meta name="description" content={description} />
                    </Helmet>
                    {picture&&picture.length>0
                        ? <PhotoBlock pictures={picture} title={name}/>
                        : null}
                    <InfoBlock {...{id, name, description, price:donePrice, param}}/>
                    </>)
                :<LoaderSingleProduct/>}
        </div>)
}