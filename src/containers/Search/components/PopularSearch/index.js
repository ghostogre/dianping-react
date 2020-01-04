import React, { Component } from 'react';
import './style.css'

const data = ['三里屯', '百脑汇', '全聚德', 'KFC', '星巴克', '汉堡王', '杨国福', '牛肉汤', '年糕']

class PopularSearch extends Component {
  render() {
    return (
      <div className="popularSearch">
        {
          data.map((item, index) => {
            return (
              <span key={index} className="popularSearch__item">{item}</span>
            )
          })
        }
      </div>
    );
  }
}

export default PopularSearch;