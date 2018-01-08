/* eslint-disable import/prefer-default-export */
import React from 'react'
import { autorun, isObservable, toJS } from 'mobx'
import shallowEqual from 'fbjs/lib/shallowEqual'

export const inject = injectFunction => Component => class extends React.Component {
  static contextTypes = {
    mobxStores: () => null, // this is to avoid importing prop-types
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      injectedProps: {},
    }

    let firstRun = true
    this.dispose = autorun(() => {
      // rerun store mapping so the flat values are processed again
      // FIXME: Pass this.props ? Then we should call
      //        the whole function on `componentWillReceiveProps`
      const injected = injectFunction(this.context.mobxStores)

      // copy to make sure we don't mutate an object that could be used by the inject
      const injectedProps = { ...injected }

      // flatten mobx observables
      Object.keys(injectedProps).forEach((key) => {
        const value = injectedProps[key]
        if (isObservable(value)) {
          injectedProps[key] = toJS(injectedProps[key])
        }
      })

      // on first run we have to use this.state, not this.setState
      if (firstRun) {
        firstRun = false
        this.state = { ...this.state, injectedProps }
      } else if (!shallowEqual(injectedProps, this.state.injectedProps)) {
        this.setState(prevState => ({ ...prevState, injectedProps }))
      }
    })
  }

  /* unbind observable reaction */
  componentWillUnmount() {
    this.dispose()
  }

  render() {
    return (
      <Component
        /* this is parent props */
        {...this.props}
        /* this is injected props from hoc */
        {...this.state.injectedProps}
      />
    )
  }
}
