import React, { Component } from 'react';
import './style.css'

class SearchBox extends Component {
  render() {
    const { inputText, relatedKeywords } = this.props
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" value={inputText} onChange={this.handleChange} />
          <span className="searchBox__clear" onClick={this.handleClear}></span>
          <span className="searchBox__cancel" onClick={this.handleCancel}>取消</span>
        </div>
        {relatedKeywords.length > 0 ? this.renderSuggestList() : null}
      </div>
    );
  }

  renderSuggestList () {
    const { relatedKeywords } = this.props
    return (
      <ul className="searchBox__list">
        {
          relatedKeywords.map((item, index) => {
            return (
              <li key={index} className="searchBox__item" onClick={this.handleClickItem.bind(this, item)}>
                <span className="searchBox__itemTitle">{item.keyword}</span>
                <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  handleClear = () => {
    this.props.onClear()
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  handleClickItem = (item) => {
    this.props.onClick(item)
  }
}

export default SearchBox;