import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';
import Banner from './components/Banner';
import Category from './components/Category';
import Headline from './components/Headline';
import Activity from './components/Activity';
import Discount from './components/Discount';
import LikeList from './components/LikeList';
import HomeHeader from './components/HomeHeader';
import MyFooter from '../../components/Footer';
import { actions as homeActions, getDiscounts, getLikes,
getPageCountOfLikes } from '../../redux/modules/home';

class Home extends Component {
  render() {
    const { likes, discounts, pageCount } = this.props
    return (
      <div>
        <HomeHeader></HomeHeader>
        <Banner></Banner>
        <Category></Category>
        <Headline></Headline>
        <Activity></Activity>
        <Discount data={discounts}></Discount>
        <LikeList data={likes} pageCount={pageCount} fetchData={this.fetchMoreLikes}></LikeList>
        <MyFooter></MyFooter>
      </div>
    );
  }

  componentDidMount () {
    this.props.homeActions.loadDiscounts()
  }

  fetchMoreLikes = () => {
    this.props.homeActions.loadLikes()
  }
}

const mapStateToProps = (state, props) => {
  return {
    likes: getLikes(state),
    discounts: getDiscounts(state),
    pageCount: getPageCountOfLikes(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);