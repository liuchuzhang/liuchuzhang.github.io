import { fromJS } from 'immutable'
import * as at from './actionTypes'

const INITIAL_STATE = fromJS({
  tagData: { tagInfo: [], postCount: 0 },
  postList: [],
  total: 0,
  loadMore: false
})

const resetStatePostInfo = (state, data) => {
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
    case at.GET_POST_INFO:
      return resetStatePostInfo(state, action.data)
    case at.GET_TAG_INFO:
      return state.update('tagData', () => fromJS(action.data))
    case at.INIT_POST_INFO:
      return state
        .update('postList', () => [])
        .update('total', () => 0)
        .update('loadMore', () => false)
    default:
      return state
  }
}
