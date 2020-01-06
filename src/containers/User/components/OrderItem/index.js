import React, { Component } from 'react'
import './style.css'

class OrderItem extends Component {
  render() {
    const { title, statusText, orderPicUrl, channel, text, type } = this.props.data
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
              type === 1? (
                <div className="orderItem__btn">评价</div>
              ): null
            }
            <div className="orderItem__btn">删除</div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderItem