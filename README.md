# k-mobx-react

🚧 this is a work in progress 🚧

Connect MobX (and mobx-state-tree) to React with plain old JS props!
> This is a better isolation of concerns

[![CircleCI](https://circleci.com/gh/alakarteio/k-mobx-react.svg?style=shield)](https://circleci.com/gh/alakarteio/k-mobx-react) [![Coverage Status](https://coveralls.io/repos/github/alakarteio/k-mobx-react/badge.svg?branch=master)](https://coveralls.io/github/alakarteio/k-mobx-react?branch=master) [![NPM Version](https://badge.fury.io/js/k-mobx-react.svg)](https://www.npmjs.com/package/k-mobx-react)
[![Size](http://img.badgesize.io/alakarteio/k-mobx-react/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [API](#api)
 - [Examples](#examples)

## Purpose
This library offer the same `inject` API that the standard [mobx-react](https://github.com/mobxjs/mobx-react) library.
What differs is about the types of props that are injected in the wrapped ReactJS component.

 - With the standard `mobx-react` the props injected can be observable.
 - With `k-mobx-react` the props injected **are** plain old JS objects.

## Why
We feel that observable object in ReactJS component enforce bad pattern of developments:
 - It pushed the use of nested props into a ReactJS component
    * We think that flat props are best because it is easier to optimise this kind of components
 - You have to use customs `PropTypes`
 - You can't bind a common React Component with this kind of objects
    * We have some problems our existing React components that did not always worked as expected

## Installation
 - `npm install --save k-mobx-react`
 - `yarn add k-mobx-react`

## API
 - You can just change you `mobx-react` import with the new one: `k-mobx-react`
 - If you use nested props, you should changes them to use flat props

## Examples
TODO

# About ![alakarteio](http://alakarte.io/assets/img/logo.markdown.png)
**alakarteio** is created by two passionate french developers.

Do you want to contact them ? Go to their [website](http://alakarte.io)

<table border="0">
 <tr>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/26094222?s=460&v=4" width="100" /></td>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/17828231?s=460&v=4" width="100" /></td>
 </tr>
 <tr>
  <td align="center"><a href="https://github.com/guillaumecrespel">Guillaume CRESPEL</a></td>
  <td align="center"><a href="https://github.com/fabienjuif">Fabien JUIF</a></td>
</table>
