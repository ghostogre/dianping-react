// 抽象封装reducer的重复代码
const createReducer = (name) => {
  return (state = {}, action) => {
    if (action.response && action.response[name]) { // 返回的action里包含response属性
      return { ...state, ...action.response[name] }
    }
    return state;
  };
}

export default createReducer
