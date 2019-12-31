import React, { Component } from 'react';
import ErrorToast from '../../components/ErrorToast';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  { getError, actions as appActions } from '../../redux/modules/app';
import Home from '../Home';
import ProductDetail from '../ProductDetail';
import './style.css';

class App extends Component {
  render () {
    const {
      error,
      appActions: { clearError }
    } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/detail/:id" component={ProductDetail}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </Router>
        {error ? <ErrorToast msg={error} clearError={clearError}/> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
