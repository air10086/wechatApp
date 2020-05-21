/*
 * @Descripttion: 
 * @Date: 2020-05-21 23:55:24
 * @LastEditTime: 2020-05-21 23:56:28
 */
import {
  createStore,
  combineReducers,
  applyMiddleware
} from '../lib/redux.min'
import thunkMiddleware from 'redux-thunk'


// 这里可以在上传代码时不使用 logger
const NEED_LOGGER = true
const middlewares = [thunkMiddleware]

if (NEED_LOGGER) {
  const {
    createLogger
  } = require('redux-logger')
  middlewares.push(createLogger())
}

const rootReducer = combineReducers({

})

const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const {
  dispatch
} = store

export {
  connectFromState
}
from './utils'

export default store