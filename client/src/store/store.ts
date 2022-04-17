import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from './reducers/userReducer';




const reducer = combineReducers({
    users: userReducer
})

export const store = createStore(reducer, applyMiddleware(compose(thunk)))