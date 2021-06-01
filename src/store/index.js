import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './../reducers/index';


const initialState = {};

const middleware = [thunk];

let store;
export default store = createStore(combineReducers, initialState, compose(applyMiddleware(...middleware)))
