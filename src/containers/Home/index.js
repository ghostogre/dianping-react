import React, { Component } from 'react';
import './style.css';
import Category from './components/Category';
import Headline from './components/Headline';
import Discount from './components/Discount';
import LikeList from './components/LikeList';

class Home extends Component {
  render() {
    return (
      <div>
        <Category></Category>
        <Headline></Headline>
        <Discount></Discount>
        <LikeList></LikeList>
      </div>
    );
  }
}

export default Home;