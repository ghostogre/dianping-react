import React, { Component } from 'react';
import './style.css'

class PopularSearch extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="popularSearch">
        {
          data.map((item) => {
            return (
              <span key={item.id} className="popularSearch__item" onClick={this.handleClickItem.bind(this, item)}
                >{item.keyword}</span>
            )
          })
        }
      </div>
    );
  }

  handleClickItem = (item) => {
    this.props.onClickItem(item)
  }
}

export default PopularSearch;