import React, { Component } from 'react';
import SearchBox from './components/SearchBox'
import SearchHistory from './components/SearchHistory'
import PopularSearch from './components/PopularSearch'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as searchActions, getRelatedKeywords, getPopularKeywords,
  getInputText, getHistoryKeywords } from '../../redux/modules/search'

class Search extends Component {
  render() {
    const { inputText, relatedKeywords, historyKeywords, popularKeywords } = this.props
    return (
      <div>
        <SearchBox inputText={inputText} relatedKeywords={relatedKeywords}
          onChange={this.handleChangeInput}
          onClear={this.handleClearInput}
          onCancel={this.handleCancel}
          onClickItem={this.handleClickItem}></SearchBox>
        <PopularSearch data={popularKeywords} onClickItem={this.handleClickItem}></PopularSearch>
        <SearchHistory data={historyKeywords} onClickItem={this.handleClickItem} onClear={this.handleClearHistory}></SearchHistory>
      </div>
    );
  }

  componentDidMount () {
    const { loadPopularKeywords } = this.props.searchActions
    loadPopularKeywords()
  }

  componentWillUnmount () {
    // 清除输入框文本
    const { clearInputText } = this.props.searchActions
    clearInputText()
  }

  // 处理输入
  handleChangeInput = (text) => {
    const { setInputText, loadRelatedKeywords } = this.props.searchActions
    loadRelatedKeywords(text)
    setInputText(text)
  }

  // 清空输入框
  handleClearInput = () => {
    const { clearInputText } = this.props.searchActions
    clearInputText()
  }

  // 取消退出页面
  handleCancel = () => {
    this.handleClearInput()
    this.props.history.goBack()
  }

  // 处理点击关键词的逻辑
  handleClickItem = (item) => {
    const { setInputText, addHistoryKeyword, loadRelatedShops } = this.props.searchActions
    setInputText(item.keyword)
    addHistoryKeyword(item.id)
    loadRelatedShops(item.id)
    // 跳转搜索结果页面
    this.props.history.push("/search_result")
  }

  // 清除history
  handleClearHistory = () => {
    const { clearHistoryKeywords } = this.props.searchActions
    clearHistoryKeywords()
  }
}

const mapStateToProps = (state, props) => {
  return {
    relatedKeywords: getRelatedKeywords(state),
    inputText: getInputText(state),
    historyKeywords: getHistoryKeywords(state),
    popularKeywords: getPopularKeywords(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(Search);