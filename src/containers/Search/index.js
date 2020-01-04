import React, { Component } from 'react';
import SearchBox from './components/SearchBox'
import SearchHistory from './components/SearchHistory'
import PopularSearch from './components/PopularSearch'

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox></SearchBox>
        <PopularSearch></PopularSearch>
        <SearchHistory></SearchHistory>
      </div>
    );
  }
}

export default Search;