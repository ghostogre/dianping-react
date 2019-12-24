import { combineReducers } from 'redux';
import entities from './entities';
import app from './app';
import detail from './detail';
import home from './home';

// 合并
const rootReducer = combineReducers({
  app,
  detail,
  home,
  entities
});

export default rootReducer;
