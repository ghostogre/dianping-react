import { combineReducers } from 'redux';
import entities from './entities';
import app from './app';
import detail from './detail';
import home from './home';
import search from './search'

// 合并
const rootReducer = combineReducers({
  app,
  detail,
  home,
  entities,
  search
});

export default rootReducer;
