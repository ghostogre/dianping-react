import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import api from './middlewares/api';
import thunk from 'redux-thunk';

let store;

if (
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, api));
}

export default store;