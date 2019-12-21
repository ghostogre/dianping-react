// import { get } from '../../utils/request';
import { url  } from '../../utils/url';
import { FETCH_DATA } from '../middlewares/api';
import { schema } from '../modules/entities/products'
export const types = {
  // 获取猜你喜欢
  FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
  // 获取猜你喜欢成功
  FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
  // 获取猜你喜欢失败
  FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',

};

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
      const endpoint = url.getProductList(0, 10)
      return dispatch(fetchLikes(endpoint))
    }
  }
}

// 不会在home.js里面被调用（actions.获取）
const fetchLikesRequest = () => ({
  type: types.FETCH_LIKES_REQUEST
});

const fetchLikesSuccess = (data) => ({
  type: types.FETCH_LIKES_SUCCESS,
  data
});

const fetchLikesFailure = (error) => ({
  type: types.FETCH_LIKES_FAILURE,
  error
})

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      // todo
      break;
    case types.FETCH_LIKES_SUCCESS:
      // todo
      break;
    case types.FETCH_LIKES_FAILURE:
      // todo
      break;
    default:
      return state;
  }
};

export default reducer;
