import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Header from "./components/Header/Header";
import MainBodyContent from "./components/MainPageBody/MainBodyContent";
import SingleProductContent from "./components/SingleProductBody/SingleProductContent";
import Footer from "./components/Footer/Footer";
import Helmet from "react-helmet";

const App = () => {
  return (
      <div className='app-wrapper'>
        <Header />
          <Helmet>
              <title>{process.env.REACT_APP_MAIN_TITLE}</title>
              <meta name="description"
                    content={process.env.REACT_APP_MAIN_DESCRIPTION}/>
          </Helmet>
        <div className='app-wrapper-content'>
          <Route path={['/', '/categories/:catId']}
                 render={ () => <MainBodyContent /> } exact/>

          <Route path='/product/:prodId?'
                 render={ () => <SingleProductContent /> }/>
        </div>
          <Footer />
      </div>
  )
}

export default App;
