import React, { Component } from 'react';
import './style.css'

class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputText: ''
    }
  }

  render() {
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" value={this.state.inputText} onChange={this.handleChange} />
          <span className="searchBox__clear" onClick={this.handleClear}></span>
          <span className="searchBox__cancel" onClick={this.handleCancel}>取消</span>
        </div>
        {this.state.inputText.length > 0 ? this.renderSuggestList() : null}
      </div>
    );
  }

  renderSuggestList () {
    const data = [
      {
        keyword: 'a',
        quantity: '12'
      }
    ]
    return (
      <ul className="searchBox__list">
        {
          data.map((item, index) => {
            return (
              <li key={index} className="searchBox__item">
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
    this.setState({
      inputText: e.target.value
    })
  }

  handleClear = () => {
    this.setState({
      inputText: ''
    })
  }

  handleCancel = () => {
  }
}

export default SearchBox;