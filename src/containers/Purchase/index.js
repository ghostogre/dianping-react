import React, { Component } from 'react'
import Header from '../../components/Header'
import PurchaseForm from './components/PurchaseForm'
import Tip from '../../components/Tip'
import { connect } from 'react-redux'
import { actions as purchaseActions, getProduct, getQuantity,
getTipStatus, getTotalPrice } from '../../redux/modules/purchase'
import { getUsername } from '../../redux/modules/login'
import { bindActionCreators } from 'redux'
import { actions as detailActions } from '../../redux/modules/detail'

class Purchase extends Component {
  render() {
    const { product, phone, quantity, showTip, totalPrice } = this.props
    return (
      <div>
        <Header title="下单" onBack={this.handleBack}></Header>
        {product ? (<PurchaseForm
          phone={phone}
          quantity={quantity}
          totalPrice={totalPrice}
          onSubmit={this.handleSubmit}
          onSetQuantity={this.handleSetQuantity}
        ></PurchaseForm>) : null}
        { showTip ? <Tip message="购买成功" onClose={this.handleCloseTip}></Tip> : null }
      </div>
    );
  }

  componentDidMount () {
    const { product } = this.props
    if (!product) {
      const productId = this.props.match.params.id      
      this.props.detailActions.loadProductDetail(productId)
    }
  }
  componentWillUnmount () {
    // 每次离开页面的时候重置数量
    this.props.purchaseActions.setOrderQuantity(1)
  }

  // 顶部返回
  handleBack = () => {
    this.props.history.goBack()
  }

  // 关闭tip
  handleCloseTip = () => {
    this.props.purchaseActions.closeTip()
  }

  // 提交订单
  handleSubmit = () => {
    const productId = this.props.match.params.id
    this.props.purchaseActions.submitOrder(productId)
  }

  // 设置购买的数量
  handleSetQuantity = (quantity) => {
    this.props.purchaseActions.setOrderQuantity(quantity)
  }
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id
  return {
    quantity: getQuantity(state),
    showTip: getTipStatus(state),
    product: getProduct(state, productId),
    totalPrice: getTotalPrice(state, productId),
    phone: getUsername(state) // 用户名就是手机号
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    purchaseActions: bindActionCreators(purchaseActions, dispatch),
    detailActions: bindActionCreators(detailActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Purchase)
