import { combineReducers } from 'redux';
import products from './products';
import shops from './shops';
import comments from './comments';
import orders from './orders';
import keywords from './keywords'

const rootReducer = combineReducers({
  products,
  comments,
  orders,
  shops,
  keywords
});

export default rootReducer;
