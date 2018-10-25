import * as at from './actionTypes'
import { getTagInfo, getPostByTag } from './../../posts'

export const fetchTagInfo = () => async dispatch => {
  const tagInfo = await getTagInfo()
  dispatch({
    type: at.GET_TAG_INFO,
    data: tagInfo
  })
}


export const setTagName = tagName => ({
  type: at.SET_TAG_NAME,
  data: tagName
})

export const fetchPostByTag = (tagName, pageSize, page) => async dispatch => {
  const postData = await getPostByTag(tagName, pageSize, page)
  dispatch({
    type: at.GET_POST_INFO_BY_TAG,
    data: postData
  })
}
