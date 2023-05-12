import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components'
import { Nav } from 'react-bootstrap';
import useDidMountEffect from '../useDidMountEffect.js';

import { Context1 } from '../App.js';
import { useDispatch, useSelector } from "react-redux";
import { addCart, noShoppedTriggerInit, setWatchedItem, shoppedTriggerInit } from "../store.js";

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

let NewBtn = styled.button(YellowBtn);

let Box = styled.div`
    background : grey;
    padding : 20px;
`

function Details({ shoes }) {
    let navigate = useNavigate;
    let state = useSelector((state) => state);
    let dispatch = useDispatch();

    //let { remain } = useContext(Context1); //디스트럭처링

    let [count, setCount] = useState(0);
    let [show, setShow] = useState('');
    let [tab, setTab] = useState(0);

    useEffect(() => {
        let timer2 = setTimeout(() => { setShow('end') }, 100);

        return () => {
            clearTimeout(timer2);
            setShow('');
        }
    }, []);



    // useEffect(() => {
    //     let timer = setTimeout(() => {
    //         setAlert(false);
    //     }, 2000)

    //     return () => {
    //         console.log('useEffect 실행 전 실행, 기존 타이머 제거, 기존 데이터 요청 제거 등 클리너 기능');
    //         clearTimeout(timer);
    //     }
    // }, []);

    let { id } = useParams();
    let shoesIndex = shoes.findIndex(obj => obj.id == id);

    useEffect(() => {
        if (shoesIndex >= 0) {
            dispatch(setWatchedItem(id));
        }
    }, []);

    if (shoesIndex >= 0) {
        return (
            <div className={'container start ' + show}>
                {/* {
                    alert == true ?
                        <div className="alert alert-warning">
                            2초이내 구매시 할인
                        </div>
                        : null
                } */}

                {/* <YellowBtn bg="blue" onClick={() => setCount(count + 1)}>버튼</YellowBtn> */}
                <div className="row">
                    <div className="col-md-6">
                        {/* <img src={process.env.PUBLIC_URL + '/img/shoes' + (Number(id) + 1) + '.jpg'} width="100%" /> */}
                        <img src={'https://codingapple1.github.io/shop/shoes' + (Number(id) + 1) + '.jpg'} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{shoes[shoesIndex].title}</h4>
                        <p>{shoes[shoesIndex].price}</p>
                        <p>{shoes[shoesIndex].content}</p>
                        <button className="btn btn-danger" onClick={() => {
                            let cartIndex = state.cart.findIndex(obj => obj.id == shoes[shoesIndex].id);
                            if (cartIndex < 0) {
                                dispatch(addCart(shoes[shoesIndex]));
                                dispatch(shoppedTriggerInit(1));
                            } else {
                                dispatch(noShoppedTriggerInit(1));
                            }
                        }}>주문하기</button>
                    </div>
                </div>

                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={() => {
                            setTab(0);
                        }}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={() => {
                            setTab(1);
                        }}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={() => {
                            setTab(2);
                        }}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab tab={tab}></Tab>
            </div>
        )
    } else {
        return (
            <div>404! 없는 페이지입니다.</div>
        )
    }

}

function Tab({ tab }) {
    let [fade, setFade] = useState('');
    useEffect(() => {
        let timer = setTimeout(() => { setFade('end') }, 100);

        return () => {
            clearTimeout(timer);
            setFade('');
        }
    }, [tab])
    return (
        <div className={'start ' + fade}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )
}




export default Details;