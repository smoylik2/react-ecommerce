import React, {useEffect} from 'react'
import s from './contentlist.module.scss'
import {useDispatch, useSelector} from "react-redux";
import SingleProductCard from "./SingleProductCard/SingleProductCard";
import {createSortByCategory} from "../../../redux/main-page-reducer";
import Helmet from "react-helmet";
import {getCategoryText} from "../../../redux/single-product-reducer";

export default ({catId}) => {
    let arrViewContent = useSelector(state=>state.mainPage.viewProductsList);
    let categoriesList = useSelector(state => state.header.categories);
    const dispatch = useDispatch();
    let headTitle = catId
        ? getCategoryText(catId, categoriesList)
        : process.env.REACT_APP_MAIN_TITLE;
    useEffect(()=>{
        if(catId)dispatch(createSortByCategory(categoriesList, catId))
        }, [catId]);


    let viewContent = arrViewContent.map(v => <SingleProductCard img={v.pic}
                                                                 title={v.name}
                                                                 price={v.price}
                                                                 link={v.link}/>);

    return (
        <div className={s.block}>
            <Helmet>
                <title>{headTitle}</title>
            </Helmet>
            {viewContent}
        </div>
    )
}