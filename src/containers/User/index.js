import React, { Component } from 'react'
import UserMain from './components/UserMain'
import UserHeader from './components/UserHeader'

class User extends Component {
  render() {
    return (
      <div>
        <UserHeader onBack={this.handleBack} onLogout={this.logout}></UserHeader>
        <UserMain></UserMain>
      </div>
    )
  }
  handleBack = () => {

  }
  logout = () => {
    
  }
}

export default User
