import React, {useState, useEffect, useRef} from 'react'
import s from './sortproductlist.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {createSortAction, createSortByDefault} from "../../../redux/main-page-reducer";


const HideSortList = (props) => {
    const arrOption = props.sortList.map((v, i)=>{
        return (<button className={s.selectBtn}
                        onClickCapture={()=>v.action(v.title)}
                        key={v.title.length+i}>{v.title}</button>)
    });

    return (<div className={s.showList}>
            {arrOption}
        </div>
    )
};


export default (props) => {
    const sortList = (actionType) => (title) => {
        setState({...state, activeBtn: title, showList: false});
        switch (actionType) {
            case ('sortAsc'):
                dispatch(createSortAction("asc"));
                break;
            case ('sortDesc'):
                dispatch(createSortAction("desc"));
                break;
            default:
                dispatch(createSortByDefault())
        }
    };

    let [state, setState] = useState({
        activeBtn: 'Новинки',
        arrSortList: [{title: 'От дешевых к дорогим', action: sortList('sortAsc')},
            {title: 'От дорогих к дешевым', action: sortList("sortDesc")},
            {title: 'Новинки', action: sortList()}],
        showList: false
    });
    const stateRef = useRef(state);
    stateRef.current = state;
    const dispatch = useDispatch();
    let sortStatus = useSelector(state=>state.mainPage.sortStatus);

    useEffect(()=>{
        setState({...state, activeBtn: sortStatus})
    }, [sortStatus]);

    const toggleShowList = () => setState({...state, showList: !state.showList});
    const toggleForBlur = () => setTimeout(() => setState({
            ...stateRef.current,
            showList: false
        }),
        500);

    let list = null;
    if (state.showList) list = <HideSortList sortList={state.arrSortList} toggleShowList={toggleShowList}/>;

    return (<div className={s.block}>
        <div className={s.jacket}>
        <button className={s.mainBtn} onClick={toggleShowList} onBlur={toggleForBlur}>
            {state.activeBtn}
            <div className={s.arrow}/>
        </button>
        {list}
        </div>
    </div>)
}