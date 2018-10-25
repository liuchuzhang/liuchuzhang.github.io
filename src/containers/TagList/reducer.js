import { fromJS } from 'immutable'
import * as at from './actionTypes'

const INITIAL_STATE = fromJS({
  tagData: {
    postCount: 0,
    tagInfo: []
  },
  tagName: '',
  postList: [],
  total: 0,
  loadMore: false
})

const resetStateTagChange = (state, tagName) =>
  state
    .update('tagName', () => tagName)
    .update('postList', () => [])
    .update('total', () => 0)
    .update('loadMore', () => true)

const resetStateByTag = (state, data) => {
  const curList = state.toJS().postList.concat(data.posts)
  return state
    .update('postList', _ => fromJS(curList.map(p => fromJS(p))))
    .update('total', _ => data.total)
    .update(
      'loadMore',
      _ => (data.pageSize * data.curPage >= data.total ? false : true)
    )
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.GET_TAG_INFO:
      return state.update('tagData', () => fromJS(action.data))
    case at.GET_POST_INFO_BY_TAG:
      return resetStateByTag(state, action.data)
    case at.SET_TAG_NAME:
      return resetStateTagChange(state, action.data)
    default:
      return state
  }
}
