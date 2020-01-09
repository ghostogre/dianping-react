// import { get } from '../../utils/request';
import url from '../../utils/url';
import { FETCH_DATA } from '../middlewares/api';
import { schema } from '../modules/entities/products';
import { combineReducers } from 'redux'

// 请求用到的常量
export const params = {
  PATH_LIKES: 'likes',
  PATH_DISCOUNTS: 'discounts',
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3
}

export const types = {
  // 获取猜你喜欢
  FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
  // 获取猜你喜欢成功
  FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
  // 获取猜你喜欢失败
  FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',
  // 获取特惠商品
  FETCH_DISCOUNT_REQUEST: 'HOME/FETCH_DISCOUNT_REQUEST',
  // 获取特惠商品成功
  FETCH_DISCOUNT_SUCCESS: 'HOME/FETCH_DISCOUNT_SUCCESS',
  // 获取特惠商品失败
  FETCH_DISCOUNT_FAILURE: 'HOME/FETCH_DISCOUNT_FAILURE',
};

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    endpoint,
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE
    ],
    schema
  }
})

const fetchDiscounts = (endpoint) => ({
  [FETCH_DATA]: {
    endpoint,
    types: [
      types.FETCH_DISCOUNT_REQUEST,
      types.FETCH_DISCOUNT_SUCCESS,
      types.FETCH_DISCOUNT_FAILURE
    ],
    schema
  }
})

export const actions = {
  // loadLikes: () => {
  //   return (dispatch, getState) => {
  //     dispatch(fetchLikesRequest());
  //     return get(url.getProductList(0, 10)).then(res => {
  //       dispatch(fetchLikesSuccess(res));
  //     },
  //     err => {
  //       dispatch(fetchLikesFailure(err));
  //     })
  //   };
  // }
  loadLikes: () => {
    return (dispatch, getState) => {
      const { pageCount } = getState().home.likes
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES
      const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
      return dispatch(fetchLikes(endpoint))
    }
  },
  loadDiscounts: () => {
    return (dispatch, getState) => {
      const { ids } = getState().home.likes
      if (ids.length > 0) { // 缓存
        return null
      }
      const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS)
      return dispatch(fetchDiscounts(endpoint))
    }
  }
}

// const fetchLikesRequest = () => ({
//   type: types.FETCH_LIKES_REQUEST
// });

// const fetchLikesSuccess = (data) => ({
//   type: types.FETCH_LIKES_SUCCESS,
//   data
// });

// const fetchLikesFailure = (error) => ({
//   type: types.FETCH_LIKES_FAILURE,
//   error
// })

const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
};

const discounts = (state = initialState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNT_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_DISCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_DISCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  likes,
  discounts
})

export default reducer;

// selector
// 获取猜你喜欢state
export const getLikes = state => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}

// 获取特惠商品state
export const getDiscounts = state => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

// 分页加载
export const getPageCountOfLikes = state =>
  state.home.likes.pageCount
