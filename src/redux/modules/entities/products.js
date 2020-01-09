import createReducer from '../../../utils/createReducer'

export const schema = {
  name: 'products',
  id: 'id'
};

const reducer = createReducer(schema.name)

export default reducer;

// selectors
// 商品详情
export const getProductDetail = (state, id) => {
  const product = state.entities.products[id]
  // 判断是否存在而且具备详情信息
  return product && product.detail && product.purchaseNotes ? product : null
}

// 获取商品
export const getProductById = (state, id) => {
  return state.entities.products[id]
}

export const getAllProduct = state =>
  state.entities.products
