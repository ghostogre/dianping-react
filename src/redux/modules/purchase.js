import { getProductDetail } from './entities/products'
import { AVAILABLE_TYPE, actions as orderActions } from './entities/orders'
import { createSelector } from 'reselect'

const initialState = {
  quantity: 1,
  showTip: false
}

export const types = {
  // 设置下单数量
  SET_ORDER_QUANTITY: 'PURCHASE/SET_ORDER_QUANTITY',
  // 关闭提示框
  CLOSE_TIP: 'PURCHASE/CLOSE_TIP',
  // 提交订单
  SUBMIT_ORDER_REQUEST: 'PURCHASE/SUBMIT_ORDER_REQUEST',
  SUBMIT_ORDER_SUCCESS: 'PURCHASE/SUBMIT_ORDER_SUCCESS',
  SUBMIT_ORDER_FAILURE: 'PURCHASE/SUBMIT_ORDER_FAILURE'
}

// action creator

export const actions = {
  setOrderQuantity: quantity => ({
    type: types.SET_ORDER_QUANTITY,
    quantity
  }),
  closeTip: () => ({
    type: types.CLOSE_TIP
  }),
  submitOrder: productId => {
    return (dispatch, getState) => {
      dispatch({ type: types.SUBMIT_ORDER_REQUEST })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = getProductDetail(getState(),
          productId)
          const quantity = getState().purchase.quantity
          const totalPrice = (product.currentPrice *
            quantity).toFixed(1)
          const text1 = `${quantity}张 | 总价：${totalPrice}`
          const text2 = product.validityPeriod
          const order = {
            title: `${product.shop}:${product.product}`,
            orderPicUrl: product.picture,
            channel: '团购',
            statusText: '待消费',
            text: [text1, text2],
            type: AVAILABLE_TYPE
          }
          dispatch(orderActions.addOrder(order))
          dispatch({type: types.SUBMIT_ORDER_SUCCESS})
          resolve()
        }, 500)
      })
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_QUANTITY:
      return {
        ...state,
        quantity: [action.quantity]
      }
    case types.CLOSE_TIP:
      return {
        ...state,
        showTip: false
      }
    case types.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        showTip: true
      }
    default:
      return state
  }
}

export default reducer

// selectors

// 获取购买数量
export const getQuantity = state =>
  state.purchase.quantity

// 获取tip状态
export const getTipStatus = state =>
  state.purchase.showTip

// 获取产品详情
// entities下虽然已经有了，不希望视图层关注到领域内部的状态模块
export const getProduct = (state, id) =>
  getProductDetail(state, id)

// 获取总价
export const getTotalPrice = createSelector(
  [getProduct, getQuantity], (product, quantity) => {
    if (!product) {
      return 0
    } else {
      return (product.currentPrice * quantity).toFixed(1)
    }
  }
)
