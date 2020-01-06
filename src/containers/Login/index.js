import React, { Component } from 'react'
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import { getUsername, getPassword, isLogin, actions as loginActions } from '../../redux/modules/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  render() {
    const { username, password, status, location: { state } } = this.props
    if (status) {
      if (state && state.from) {
        return <Redirect to={state.from}></Redirect>
      }
      return <Redirect to="/user"></Redirect>
    }
    return (
      <div>
        <LoginHeader></LoginHeader>
        <LoginForm
          username={username}
          password={password}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          ></LoginForm>
      </div>
    );
  }
  handleChange = (e) => {
    if (e.target.name === 'username') {
      this.props.loginActions.setUsername(e.target.value)
    } else if (e.target.name === 'password') {
      this.props.loginActions.setPassword(e.target.value)
    }
  }
  // 登录
  handleSubmit = () => {
    this.props.loginActions.login()
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: getUsername(state),
    password: getPassword(state),
    status: isLogin(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login)