import './App.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState, useRef, useEffect, createContext } from 'react';
import bgImg from './img/bg.png';
import shoesData from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Details from './routes/Details.js';
import Cart from './routes/Cart.js';
import axios from 'axios';
import useDidMountEffect from './useDidMountEffect.js';
import { useDispatch, useSelector } from 'react-redux';
import { noShoppedTriggerInit, shoppedTriggerInit, setWatchedItem } from './store';

function App() {
  let [shoes, setShoes] = useState(shoesData);
  let state = useSelector((state) => state);
  let navigate = useNavigate();
  let clickCount = useRef(0);
  let [click, setClick] = useState(clickCount.current);
  let dispatch = useDispatch();

  // let getItem = localStorage.getItem('data');

  // console.log(JSON.parse(getItem).name);
  useDidMountEffect(() => {
    let getItem = localStorage.getItem('watched');
    if (getItem == 'undefined' || getItem == null) {
      console.log('초기 스토리지 생성');

      //localStorage.setItem('watched', JSON.stringify([]));
    }
    else {
      console.log('스토리지 값 받아오기');
      let parseGetItem = JSON.parse(getItem);
      console.log('getitem 가자');
      console.log(parseGetItem);
      dispatch(setWatchedItem(parseGetItem));
    }
  }, [])

  useEffect(() => {
    let msg = '';
    if (state.isShopped[0].shoppedTrigger == 1) {
      msg = '장바구니에 추가되었습니다.';
      if (window.confirm(msg + ' 장바구니로 이동하시겠습니까?')) {
        navigate('/cart');
      }
    } else if (state.isShopped[0].noShoppedTrigger == 1) {
      msg = '이미 장바구니에 있는 상품입니다.'
      if (window.confirm(msg + ' 장바구니로 이동하시겠습니까?')) {
        navigate('/cart');
      }
    }
    return () => {
      dispatch(shoppedTriggerInit(0));
      dispatch(noShoppedTriggerInit(0));
    }
  }, [state.isShopped]);


  useDidMountEffect(() => {
    console.log('로딩중..');
    axios.get('https://codingapple1.github.io/shop/data' + (clickCount.current + 1) + '.json')
      .then((result) => {
        let copyShoes = [...shoes].concat(result.data);
        setShoes(copyShoes);
        console.log('로딩 완료!');
      })
      .catch(() => {
        console.log('데이터가 없습니다.');
      });

    // axios.post('/url', { name: 'kim' });
    // Promise.all([ axios.get('url1'), axios.get('/url2')])
    // .then(()=>{

    // })
  }, [click]);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">반가워요 KIM</Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<div><Container>
          <div className='main-bg' style={{ backgroundImage: 'url(' + bgImg + ')' }}></div>
          <Row>
            {shoes.map(
              function (name, index) {
                return (
                  <Goods shoes={shoes} index={index} key={shoes[index].id}></Goods>
                )
              }
            )}
          </Row>
        </Container>
          <button onClick={() => {
            let copyShoes = [...shoes];
            copyShoes.sort(function (a, b) {
              if (a.title < b.title) {
                return -1
              } else if (a.title > b.title) {
                return 1
              } else {
                return 0
              }
            });
            setShoes(copyShoes);
          }}>
            가나다 순으로 정렬
          </button>
          <button onClick={() => {
            clickCount.current += 1;
            setClick(clickCount.current);
          }}>데이터 GET</button>
        </div>} />
        <Route path="/detail/:id" element={
          <Details shoes={shoes} />
        } />
        <Route path="/cart" element={
          <Cart />
        } />
        <Route path="*" element={<div>404 Not Found</div>} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치임</div>}></Route>
        </Route>
        <Route path='event' element={<Event />} >
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

function Goods({ shoes, index }) {
  let shoesId = shoes[index].id;
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <Col sm>
      <Link to={"/detail/" + shoesId}>
        {/* <img src={process.env.PUBLIC_URL + '/img/shoes' + (shoesId + 1) + '.jpg'} width="80%" /> */}
        <img src={'https://codingapple1.github.io/shop/shoes' + (shoesId + 1) + '.jpg'} width="80%" />
        <h4>{shoes[index].title}</h4>
        <p>{shoes[index].content}</p>
        <p>{shoes[index].price}</p>
        <p>{shoes[index].id}</p>
      </Link>
    </Col>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
