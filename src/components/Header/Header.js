import React from 'react'
//import s from './header.module.scss'
import TopStrip from './TopStrip/TopStrip'
import SearchBlock from "./SearchBlock/SearchBlock";
import Slider from "./Slider/Slider"
import Navigation from "./NavigationStrip/Navigation";
import {Route} from "react-router-dom";
//import Slider_2 from "./Slider_2/Slider_2";

export default (props) => {
    return (<>
        <TopStrip />
        <SearchBlock />
        <Route path={['/', '/categories/:catId']} exact
            render={()=><Slider />}/>
        <Navigation />
        </>
    )
}