import url from "../../utils/url"
import { FETCH_DATA } from "../middlewares/api"
import { schema, TO_PAY_TYPE, USED_TYPE, REFUND_TYPE, AVAILABLE_TYPE, getOrdersById,
  actions as orderActions, types as orderTypes } from './entities/orders'
import {
  actions as commentActions
} from './entities/comments'
import { combineReducers } from "redux"

const typeToKey = {
  [TO_PAY_TYPE]: 'toPayIds',
  [AVAILABLE_TYPE]: 'availableIds',
  [REFUND_TYPE]: 'refundIds'
}

const initialState = {
  orders: {
    isFetching: false,
    ids: [],
    fetched: false, // 购买页面中使用，防止当在下单页面刷新后，打开个人中心不加载
    toPayIds: [], // 待付款的订单ID
    availableIds: [], // 可使用的订单ID
    refundIds: [] // 退款
  },
  currentTab: 0,
  currentOrder: { // 删除订单
    id: null,
    isDeleting: false,
    isCommenting: false,
    comment: '',
    stars: 0
  }
}

// action type
export const types = {
  // 获取订单列表
  FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: 'USER/FETCH_ORDERS_FAILURE',
  // 设置当前选中的tab
  SET_CURRENT_TAB: 'USER/SET_CURRENT_TAB',
  // 删除订单
  DELETE_ORDER_REQUEST: 'USER/DELETE_ORDER_REQUEST',
  DELETE_ORDER_SUCCESS: 'USER/DELETE_ORDER_SUCCESS',
  DELETE_ORDER_FAILURE: 'USER/DELETE_ORDER_FAILURE',
  // 删除确认对话框
  SHOW_DELETE_DIALOG: 'USER/SHOW_DELETE_DIALOG',
  HIDE_DELETE_DIALOG: 'USER/HIDE_DELETE_DIALOG',
  // 评价订单编辑
  SHOW_COMMENT_AREA: 'USER/SHOW_COMMENT_AREA',
  HIDE_COMMENT_AREA: 'USER/HIDE_COMMENT_AREA',
  // 评价内容
  SET_COMMENT: 'USER/SET_COMMENT',
  // 评分
  SET_STARS: 'USER/SET_STARS',
  // 提交
  POST_COMMENT_REQUEST: 'USER/POST_COMMENT_REQUEST',
  POST_COMMENT_SUCCESS: 'USER/POST_COMMENT_SUCCESS',
  POST_COMMENT_FAILURE: 'USER/POST_COMMENT_FAILURE',
}

// action creators
export const actions = {
  loadOrders: () => {
    return (dispatch, getState) => {
      const { ids, fetched } = getState().user.orders
      // 下单页面刷新后，会出现不加载
      // if (ids.length > 0) {
      //   return null
      // }
      if(fetched) {
        return null
      }
      const endpoint = url.getOrders()
      dispatch(fetchOrders(endpoint))
    }
  },
  setCurrentTab: index => ({
    type: types.SET_CURRENT_TAB,
    index
  }),
  // 删除订单
  removeOrder: () => {
    return (dispatch, getState) => {
      const { id } = getState().user.currentOrder
      if (id) { // 存在选中的id再进行删除
        dispatch(deleteOrderRequest())
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteOrderSuccess(id))
            dispatch(orderActions.deleteOrder(id))
            resolve()
          }, 500)
        })
      } 
    }
  },
  // 显示删除对话框
  showDeleteDialog: orderId => ({
    type: types.SHOW_DELETE_DIALOG,
    orderId
  }),
  // 隐藏删除对话框
  hideDeleteDialog: orderId => ({
    type: types.HIDE_DELETE_DIALOG,
    orderId
  }),
  // 显示订单评价编辑
  showCommentArea: orderId => ({
    type: types.SHOW_COMMENT_AREA,
    orderId
  }),
  // 隐藏订单评价编辑
  hideCommentArea: () => ({
    type: types.HIDE_COMMENT_AREA
  }),
  // 设置评价信息
  setComment: comment => ({
    type: types.SET_COMMENT,
    comment
  }),
  // 设置评价等级
  setStars: stars => ({
    type: types.SET_STARS,
    stars
  }),
  // 提交评价
  submitComment: () => {
    return (dispatch, getState) => {
      dispatch(postCommentRequest())
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const { currentOrder: { id, stars, comment } } = getState().user
          const commentObj = {
            id: +new Date(),
            stars,
            content: comment
          }
          dispatch(postCommentSuccess())
          dispatch(commentActions.addComment(commentObj))
          dispatch(orderActions.addComment(id, commentObj.id))
          resolve()
        }, 500)
      })
    }
  }
}

const deleteOrderRequest = () => ({
  type: types.DELETE_ORDER_REQUEST
})

const deleteOrderSuccess = (id) => ({
  type: types.DELETE_ORDER_SUCCESS,
  orderId: id
})

const postCommentRequest = () => ({
  type: types.POST_COMMENT_REQUEST
})

const postCommentSuccess = () => ({
  type: types.POST_COMMENT_SUCCESS
})

const fetchOrders = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE
    ],
    endpoint,
    schema
  }
})

// reducers
const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_ORDERS_SUCCESS:
      const toPayIds = action.response.ids.filter(id =>
        action.response.orders[id].type === TO_PAY_TYPE)
      const availableIds = action.response.ids.filter(id =>
        action.response.orders[id].type === AVAILABLE_TYPE)
      const refundIds = action.response.ids.filter(id =>
        action.response.orders[id].type === REFUND_TYPE)
      return {
        ...state,
        isFetching: false,
        fetched: true,
        toPayIds: state.toPayIds.concat(toPayIds),
        availableIds: state.availableIds.concat(availableIds),
        refundIds: state.refundIds.concat(refundIds),
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case orderTypes.DELETE_ORDER:
    case types.DELETE_ORDER_SUCCESS:
      // 这两种action都要同时删除user的ids和orders里的数据
      return {
        ...state,
        ids: removeOrderId(state, 'ids', action.orderId),
        toPayIds: removeOrderId(state, 'toPayIds', action.orderId),
        availableIds: removeOrderId(state, 'availableIds', action.orderId),
        refundIds: removeOrderId(state, 'refundIds', action.orderId),
      }
    case orderTypes.ADD_ORDER:
      const { order } = action
      const key = typeToKey[order.type]
      return key ? {
        ...state,
        ids: [order.id].concat(state.ids),
        [key]: [order.id].concat(state[key])
      } : {
        ...state,
        ids: [order.id].concat(state.ids)
      }
    default:
      return state
  }
}

const removeOrderId = (state, key, orderId) => {
  return state[key].filter(id => id !== orderId)
}

const currentTab = (state = initialState.currentTab, action) => {
  switch (action.type) {
    case types.SET_CURRENT_TAB:
      return action.index
    default:
      return state
  }
}

// 订单操作
const currentOrder = (state = initialState.currentOrder, action) => {
  // 重置当前删除订单信息
  switch (action.type) {
    case types.DELETE_ORDER_SUCCESS:
    case types.DELETE_ORDER_FAILURE:
    case types.HIDE_DELETE_DIALOG:
    case types.HIDE_COMMENT_AREA:
    case types.POST_COMMENT_FAILURE:
    case types.POST_COMMENT_SUCCESS:
      return initialState.currentOrder
    case types.SHOW_DELETE_DIALOG:
      return {
        ...state,
        isDeleting: true,
        id: action.orderId
      }
    case types.SHOW_COMMENT_AREA: 
      return {
        ...state,
        id: action.orderId,
        isCommenting: true
      }
    case types.SET_COMMENT:
      return {
        ...state,
        comment: action.comment
      }
    case types.SET_STARS:
      return {
        ...state,
        stars: action.stars
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  orders,
  currentTab,
  currentOrder
})

export default reducer

// selectors

// 当前TAB
export const getCurrentTab = state =>
  state.user.currentTab

// 获取订单列表
export const getOrders = state => {
  const key = ['ids', 'toPayIds', 'availableIds', 'refundIds'][state.user.currentTab]
  return state.user.orders[key].map(id => {
    return getOrdersById(state, id)
  })
}

// 需要删除的订单ID
export const getDeletingOrderId = state => {
  return state.user.currentOrder && state.user.currentOrder.isDeleting ?
    state.user.currentOrder.id : null
}

// 当前评价的订单ID
export const getCommentingOrderId = state => {
  return state.user.currentOrder && state.user.currentOrder.isCommenting ?
    state.user.currentOrder.id : null
}

// 获取当前的评论信息
export const getCurrentOrderComment = state => {
  return state.user.currentOrder ? state.user.currentOrder.comment: ''
}

// 获取当前评级信息
export const getCurrentOrderStars = state => {
  return state.user.currentOrder ? state.user.currentOrder.stars: 0
}
