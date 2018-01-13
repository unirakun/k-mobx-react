/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react'

// inspired from mobx-react/Provider :
// -> https://github.com/mobxjs/mobx-react/blob/master/src/Provider.js
export default stores => WrappedComponent => class extends Component {
  static contextTypes = {
    mobxStores: () => null, // this is to avoid importing prop-types
  }

  static childContextTypes = {
    mobxStores: () => null, // this is to avoid importing prop-types
  }

  getChildContext() {
    // inner stores ares inherit stores and newly injected
    const mobxStores = {
      ...this.context.mobxStores,
      ...stores,
    }

    return {
      mobxStores,
    }
  }

  render() {
    return <WrappedComponent {...this.props} />
  }
}
