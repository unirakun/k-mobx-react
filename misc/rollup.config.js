import path from 'path'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  name: pkg.amdName || pkg.name,
  input: pkg['jsnext:main'] || 'src/index.js',
  sourcemap: path.resolve(pkg.main),
  output: {
    file: pkg.main,
    format: process.env.FORMAT || 'umd',
  },
  external: ['fbjs/lib/shallowEqual', 'react', 'mobx', 'react-dom'],
  plugins: [
    babel(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      modulesOnly: true,
    }),
    commonjs({
      extensions: ['.js', '.jsx'],
    }),
    uglify(),
  ],
  globals: {
    react: 'React',
    mobx: 'mobx',
    'fbjs/lib/shallowEqual': 'shallowEqual',
    'mobx-react': 'mobxReact',
    'react-dom': 'reactDom',
  },
}
