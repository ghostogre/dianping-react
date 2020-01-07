import React, { Component } from 'react'
import OrderItem from '../../components/OrderItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as userActions,
  getDeletingOrderId,
  getCurrentTab,
  getCommentingOrderId,
  getCurrentOrderStars,
  getCurrentOrderComment
} from '../../../../redux/modules/user'
import './style.css'
import Confirm from '../../../../components/Confirm'

const tabTitles = ['全部订单', '待付款', '可使用', '退款售后']

class UserMain extends Component {
  render() {
    const { currentTab, data, deletingOrderId } = this.props
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {
            tabTitles.map((item, index) => {
              return (
                <div key={index} className="userMain__tab" onClick={this.handleClickTab.bind(this, index)}>
                  <span
                    className={
                      currentTab === index ? 'userMain__title userMain__title--active' : 'userMain__title'
                    }
                  >{item}</span>
                </div>
              )
            })
          }
        </div>
        <div className="userMain__content">
          {
            data && data.length > 0 ? this.renderOrderList(data) : this.renderEmpty()
          }
        </div>
        { deletingOrderId ? this.renderConfirmDialog() : null }
      </div>
    )
  }

  handleClickTab = (index) => {
    this.props.userActions.setCurrentTab(index)
  }

  // 删除订单
  handleRemove = (orderId) => {
    this.props.userActions.showDeleteDialog(orderId)
  }

  // 评价内容变化
  handleCommentChange = comment => {
    const { userActions: { setComment } } = this.props
    setComment(comment)
  }

  // 评分变化
  handleStarsChange = stars => {
    const { userActions: { setStars } } = this.props
    setStars(stars)
  }

  handleComment = (orderId) => {
    const { userActions: { showCommentArea } } = this.props
    showCommentArea(orderId)
  }

  // 取消评价
  handleCancelComment = () => {
    const { userActions: { hideCommentArea } } = this.props
    hideCommentArea()
  }

  // 提交评价
  handleSubmitComment = () => {
    const { userActions: { submitComment } } = this.props
    submitComment()
  }

  renderOrderList = (data) => {
    const { commentingOrderId, orderComment, orderStars } = this.props
    return data.map(item => {
      return (
        <OrderItem
          key={item.id}
          data={item}
          stars={item.id === commentingOrderId ? orderStars: 0}
          comment={item.id === commentingOrderId ? orderComment: ''}
          isCommenting={item.id === commentingOrderId}
          onCommentChange={this.handleCommentChange}
          onStarsChange={this.handleStarsChange}
          onComment={this.handleComment.bind(this, item.id)}
          onRemove={this.handleRemove.bind(this, item.id)}
          onSubmitComment={this.handleSubmitComment}
          onCancelComment={this.handleCancelComment}
        ></OrderItem>
      )
    })
  }

  // 渲染为空的节点
  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon"></div>
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    )
  }

  renderConfirmDialog = () => {
    const { userActions: { hideDeleteDialog, removeOrder } } = this.props
    return (
      <Confirm
        content="确定删除该订单？"
        cancelText="取消"
        confirmText="确定"
        onCancel={hideDeleteDialog}
        onConfirm={removeOrder}
      ></Confirm>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentTab: getCurrentTab(state),
    deletingOrderId: getDeletingOrderId(state),
    commentingOrderId: getCommentingOrderId(state),
    orderComment: getCurrentOrderComment(state),
    orderStars: getCurrentOrderStars(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMain)
