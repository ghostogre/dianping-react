import url from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'
import { schema as productSchema, getProductDetail, getProductById, getAllProduct } from './entities/products'
import { schema as shopSchema, getShopById, getAllShop } from './entities/shops'
import { combineReducers } from 'redux'
import createReducer from '../../utils/createReducer';
import { createSelector } from 'reselect';

const intitalState = {
  product: {
    isFetching: false,
    id: null
  },
  relatedShop: {
    isFetching: false,
    id: null
  }
}

export const types = {
  // 获取产品详情
  FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
  FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',
  // 获取关联店铺信息
  FETCH_SHOP_DETAIL_REQUEST: 'DETAIL/FETCH_SHOP_DETAIL_REQUEST',
  FETCH_SHOP_DETAIL_SUCCESS: 'DETAIL/FETCH_SHOP_DETAIL_SUCCESS',
  FETCH_SHOP_DETAIL_FAILURE: 'DETAIL/FETCH_SHOP_DETAIL_FAILURE'
}

const fetchProductDetail = (endpoint, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILURE
    ],
    endpoint,
    schema: productSchema
  }
})

const fetchProductDetailSuccess = id => ({
  type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
  id // 更新id值到reducer
})

const fetchShopById = (endpoint, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOP_DETAIL_REQUEST,
      types.FETCH_SHOP_DETAIL_SUCCESS,
      types.FETCH_SHOP_DETAIL_FAILURE
    ],
    endpoint,
    schema: shopSchema
  }
})

const fetchShopSuccess = id => ({
  type: types.FETCH_SHOP_DETAIL_SUCCESS,
  id
})

export const actions = {
  loadProductDetail: (id) => {
    return (dispatch, getState) => {
      const endpoint = url.getProductDetail(id)
      const product = getProductDetail(getState(), id)
      if (product) {
        // 缓存结果
        return dispatch(fetchProductDetailSuccess(id))
      }
      return dispatch(fetchProductDetail(endpoint, id))
    }
  },
  loadShopById: (id) => {
    return (dispatch, getState) => {
      const shop = getShopById(getState(), id)
      console.log('load')
      if (shop) {
        // 缓存结果
        return dispatch(fetchShopSuccess(id))
      }
      const endpoint = url.getShopDetail(id)
      return dispatch(fetchShopById(endpoint, id))
    }
  }
}

const product = (state = intitalState.product, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_PRODUCT_DETAIL_SUCCESS:
      // 这里的 action.id 用于缓存的情况
      return {
        ...state,
        isFetching: false,
        id: action.id
      }
    case types.FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        id: null
      }
    default:
      return state
  }
}

const relatedShop = (state = intitalState.relatedShop, action) => {
  switch (action.type) {
    case types.FETCH_SHOP_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_SHOP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      }
    case types.FETCH_SHOP_FAILURE:
      return {
        ...state,
        isFetching: false,
        id: null
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  product,
  relatedShop
})

export default reducer;

// selector
export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}

// 获取关联店铺
export const getRelatedShop = (state, productId) => {
  const product = getProductById(state, productId)
  let shopId = product ? product.nearestShop : null
  if (shopId) {
    return getShopById(state, shopId)
  }
  return null
}
