import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import allReducers from './reducers/index';
import { composeWithDevTools } from "redux-devtools-extension"
const middleWare = composeWithDevTools(applyMiddleware(logger));
const store = createStore(allReducers, {}, middleWare);

export default store;