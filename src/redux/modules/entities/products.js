export const schema = {
  name: 'products',
  id: 'id'
};

const reducer = (state = {}, action) => {
  if (action.response && action.response.products) { // 返回的action里包含response属性
    return { ...state, ...action.response.products }
  }
  return state;
};

export default reducer;
