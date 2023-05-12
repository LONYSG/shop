import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increase(state, action) {
            let cartIndex = state.findIndex(obj => obj.id == action.payload);
            state[cartIndex].count += 1;
        },
        addCart(state, action) {
            state.push({ id: action.payload.id, name: action.payload.title, count: 1 });
        },
        deleteItem(state, action) {
            let cartIndex = state.findIndex(obj => obj.id == action.payload);
            state.splice(cartIndex, 1);
        }
    }
})

let isShopped = createSlice({
    name: 'isShopped',
    initialState: [
        { shoppedTrigger: 0, noShoppedTrigger: 0 }
    ],
    reducers: {
        shoppedTriggerInit(state, action) {
            state[0].shoppedTrigger = action.payload;
        },
        noShoppedTriggerInit(state, action) {
            state[0].noShoppedTrigger = action.payload;
        }

    }
})

let watchedItem = createSlice({
    name: 'watchedItem',
    initialState: [],
    reducers: {
        getWatchedItem(state, action) {
            state = action.payload;
        },
        initWatchedItem(state, action) {
            state = action.payload;
        },
        setWatchedItem(state, action) {
            state.map(function(name){
                console.log('state 파헤치기 시작');
                console.log(name);
                console.log('state 파헤치기 끝')
            })
            state.push(action.payload);
            state = removeDuplicates([].concat(...state));

            localStorage.setItem('watched', JSON.stringify(state));
        }
    }
})

function removeDuplicates(arr) {
    return arr.filter((value, index) => arr.lastIndexOf(value) === index);
}

export let { increase, addCart, deleteItem } = cart.actions
export let { shoppedTriggerInit, noShoppedTriggerInit } = isShopped.actions
export let { getWatchedItem, setWatchedItem, initWatchedItem } = watchedItem.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer,
        isShopped: isShopped.reducer,
        watchedItem: watchedItem.reducer
    }
}) 