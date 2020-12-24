import React, {useEffect, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import s from './mainbodycontent.module.scss'
import PreloaderAnimation from "./PreloaderAnimation/PreloaderAnimation";
import {useDispatch, useSelector} from "react-redux";
import {getProductsList} from "../../redux/main-page-reducer";
import ContentList from "./ContentList/ContentList";
import SortProductList from "./SortProductList/SortProductList";
import LoadMoreButton from "./LoadMore/LoadMoreButton";


export default (props) => {
    let existContent = useSelector(state=>state.mainPage.existProductList);
    let existMoreContent = useSelector(state=>state.mainPage.existMoreProducts);
    let prodList = useSelector(state=>state.mainPage.productsList);
    const dispatch = useDispatch();
    const {catId} = useParams();
    let pureId;
    if(catId){
        pureId = catId.split('_');
        pureId = pureId.pop();
    }
    useEffect(()=>{
        if(prodList.length<1)getProductsList(dispatch)
    }, []);

    if(!existContent){
        return <PreloaderAnimation/>
    }else{
        return (<>
                <SortProductList/>
                {catId ? <ContentList catId={pureId}/> : <ContentList/>}
                {existMoreContent ? <LoadMoreButton/> : null}
            </>)
    }
}