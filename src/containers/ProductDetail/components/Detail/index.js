import React, { Component } from 'react';
import './style.css';

class Detail extends Component {
  render() {
    const { detail: { category, products, remark }, currentPrice, oldPrice } = this.props.data
    return (
      <div className="detail">
        <div className="detail__header">
          <span>团购详情</span>
          <i className="detail__headerIcon"></i>
        </div>
        <table className="detail__table" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr className="detail__row">
              <th colSpan="3" className="detail__category">{category}</th>
            </tr>
            {products.map((item, index) => {
              return (
                <tr key={index} className="detail__row">
                  <td></td>
                  <td className="detail__td--alignRight">
                    {item.quantity}
                  </td>
                  <td className="detail__td--alignRight">
                    {item.price}元
                  </td>
                </tr>
              )
            })}
            <tr>
              <td/>
              <td className="detail__td--price">
                最高价值
                <br/>
                <strong className="detail__td--priceNew">团购价</strong>
              </td>
              <td className="detail__td--price">
                {oldPrice}元
                <br/>
                <strong className="detail__td--priceNew">{currentPrice}元</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detail__remark">
          免费提供餐巾纸
        </div>
        <div className="detail__more">
          <span>更多图文详情</span>
          <span className="detail__notice">(建议在WiFi环境下打开)</span>
          <i className="detail__arrow"></i>
        </div>
      </div>
    );
  }
}

export default Detail;