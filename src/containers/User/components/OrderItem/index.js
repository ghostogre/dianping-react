import React, { Component } from 'react'
import './style.css'

class OrderItem extends Component {
  render() {
    const {
      data: { title, statusText, orderPicUrl, channel, text, type, commentId },
      isCommenting
    } = this.props
    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <img className="orderItem__img" src={orderPicUrl} alt=""/>
            <div className="orderItem__tag">{statusText}</div>
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text[0]}</div>
            <div className="orderItem__line">{text[1]}</div>
          </div>
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div className="">
            {
              type === 1 && !commentId? (
                <div className="orderItem__btn" onClick={this.handleComment}>评价</div>
              ): null
            }
            <div className="orderItem__btn" onClick={this.handleRemove}>删除</div>
          </div>
        </div>
        {isCommenting ? this.renderEditArea() : null}
      </div>
    )
  }

  // 渲染订单评价区域
  renderEditArea = () => {
    return (
      <div className="orderItem__commentContainer">
        <textarea className="orderItem__comment"
          onChange={this.handleCommentChange}
          value={this.props.comment}
        />
        {this.renderStars()}
        <button
          className="orderItem__commentBtn"
          onClick={this.props.onSubmitComment}
        >提交</button>
        <button
          className="orderItem__commentBtn"
          onClick={this.props.onCancelComment}
        >取消</button>
      </div>
    )
  }

  renderStars = () => {
    const { stars } = this.props
    return (
      <div>
        {
          [1, 2, 3, 4, 5].map((item, index) => {
            const lightClass = stars >= item ?
            ' orderItem__star--light' : ''
            return (
              <span
                key={index}
                onClick={this.props.onStarsChange.bind(this, item)}
                className={"orderItem__star" + lightClass}
              >★</span>
            )
          })
        }
      </div>
    )
  }

  // 评价内容改变
  handleCommentChange = (e) => {
    this.props.onCommentChange(e.target.value)
  }

  handleRemove = () => {
    this.props.onRemove()
  }

  // 评价按钮点击事件
  handleComment = () => {
    const { data: { id } } = this.props
    this.props.onComment(id)
  }
}

export default OrderItem