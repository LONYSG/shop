import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increaseAge } from './../store/userSlice.js'
import { deleteItem, increase } from '../store.js';

function Cart() {

    let state = useSelector((state) => state);
    let dispatch = useDispatch();

    return (
        <div>

            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cart.map(function (name, index) {
                        return (
                            <tr>
                                <td>{state.cart[index].id}</td>
                                <td>{state.cart[index].name}</td>
                                <td>{state.cart[index].count}</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(increase(state.cart[index].id));
                                    }}>추가</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(deleteItem(state.cart[index].id));
                                    }}>삭제</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;