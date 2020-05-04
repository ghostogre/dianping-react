import React, { Component } from 'react'

// 异步组件
export default function asyncComponent (importComponent) {
  class AsyncComponent extends Component {
    constructor (props) {
      super(props)
      this.state = {
        component: null
      }
    }
    componentDidMount () {
      importComponent().then(mod => {
        this.setState({
          component: mod.default
        })
      })
    }
    render () {
      const C = this.state.component
      return C ? (<C {...this.props}></C>) : null
    }
  }

  return AsyncComponent
}
