import { combineReducers } from 'redux';
import products from './products';
import shops from './shops';
import comments from './comments';
import orders from './orders';

const rootReducer = combineReducers({
  products,
  comments,
  orders,
  shops
});

export default rootReducer;
