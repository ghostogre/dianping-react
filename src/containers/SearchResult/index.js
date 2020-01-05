import React, { Component } from 'react';
import ShopList from './components/ShopList'
import Banner from '../../components/Banner'
import SearchHeader from './components/SearchHeader'
import KeywordBox from './components/KeywordBox'
import { connect } from 'react-redux'
import { getCurrentKeyword, getSearchedShops } from '../../redux/modules/search'

class SearchResult extends Component {
  render() {
    const { shops, currentKeyword } = this.props
    return (
      <div>
        <SearchHeader onBack={this.handleBack} onSearch={this.handleSearch}></SearchHeader>
        <KeywordBox text={currentKeyword}></KeywordBox>
        <Banner></Banner>
        <ShopList dark data={shops}></ShopList>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }
}

const mapStateToProps = (state, props) => {
  return {
    shops: getSearchedShops(state),
    currentKeyword: getCurrentKeyword(state)
  }
}

export default connect(mapStateToProps, null)(SearchResult)
