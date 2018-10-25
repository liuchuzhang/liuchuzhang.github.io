import { fromJS } from 'immutable'
import * as at from './actionTypes'

const INITIAL_STATE = fromJS({
  tagData: { tagInfo: [], postCount: 0 },
  postContent: {
    title: '',
    time: '',
    tag: [],
    content: ''
  }
})

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.GET_TAG_INFO:
      return state.update('tagData', () => fromJS(action.data))
    case at.GET_POST_CONTENT:
      return state.update('postContent', () => fromJS(action.data))
    default:
      return state
  }
}
