import React,{useState} from 'react';
import Carousel from 'nuka-carousel';

export default () => {

    const pb = `${process.env.PUBLIC_URL}/image/slider/`;
    const [state, setState] = useState({
        arrSlides: ['slide_1.jpg', "slide_2.jpg", "slide_1.jpg", "slide_2.jpg"],
        slideIndex: 0
    });

    let arrSlides = state.arrSlides.map((v,i,a)=>(<img src={`${pb}${v}`} key={i*i}/>));


    return (<Carousel autoplay={true} pauseOnHover={true} defaultControlsConfig={{
            nextButtonText: (<span style={{width:'40px'}}>&#10095;</span>),
            prevButtonText: (<span style={{width:'40px'}}>&#10094;</span>)
        }}
                      autoplayReverse={true} wrapAround={true}>
            {arrSlides}
        </Carousel>
    );

}