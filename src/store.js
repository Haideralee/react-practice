import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import allReducers from './reducers/index';

const middleWare = applyMiddleware(logger);
const store = createStore(allReducers, {}, middleWare);

export default store;