/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension, react/prop-types, no-param-reassign */
import React from 'react'
import { Provider } from 'mobx-react'
import { types } from 'mobx-state-tree'
import { mount } from 'enzyme'
import { inject } from './index'

const Model = types
  .model({
    sub: 'model',
  })
  .named('Model')
  .actions(self => ({
    setSub: (sub) => { self.sub = sub },
  }))

const Store = types
  .model({
    some: 'data',
    array: types.array(Model),
  })
  .named('Store')

const getStore = (snapshot = { array: [{ sub: 'model 2' }, {}] }) => Store.create(snapshot)

const MyComponent = props => <div>my component {JSON.stringify(props)}</div>

describe('k-mobx-react', () => {
  const snap = (store, Wrapped, props) => {
    const wrapper = mount(<Provider store={store}><Wrapped {...props} /></Provider>)
    expect(wrapper.text()).toMatchSnapshot()
  }

  it('should works when there is no props into inject', () => {
    const Wrapped = inject(() => ({}))(MyComponent)
    snap(getStore(), Wrapped, { fromParent: true })
  })

  it('should works when there is no observables into inject', () => {
    const Wrapped = inject(() => ({ not: 'observable' }))(MyComponent)
    snap(getStore(), Wrapped, { fromParent: true })
  })

  it('should flat observables from inject', () => {
    const Wrapped = inject(({ store }) => ({ store, not: 'observable' }))(MyComponent)
    snap(getStore(), Wrapped, { fromParent: true })
  })
})
