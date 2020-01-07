import React, { Component } from 'react'
import UserMain from './containers/UserMain'
import UserHeader from './components/UserHeader'
import { actions as userActions, getCurrentTab, getOrders } from '../../redux/modules/user'
import { actions as loginActions } from '../../redux/modules/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const { orders } = this.props
    return (
      <div>
        <UserHeader onBack={this.handleBack} onLogout={this.logout}></UserHeader>
        <UserMain data={orders}></UserMain>
      </div>
    )
  }

  componentDidMount () {
    this.props.userActions.loadOrders()
  }

  handleBack = () => {
    this.props.history.push('/')
  }
  logout = () => {
    this.props.loginActions.logout()
  }
}

const mapStateToProps = (state, props) => {
  return {
    orders: getOrders(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
