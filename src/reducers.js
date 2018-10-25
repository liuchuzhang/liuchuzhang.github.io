import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import home from './containers/Home/reducer'
import tagList from './containers/TagList/reducer'
import article from './containers/Article/reducer'

export default asyncReducers =>
  combineReducers({
    home,
    tagList,
    article,
    routing: routerReducer,
    ...asyncReducers
  })
