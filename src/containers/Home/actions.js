import * as at from './actionTypes'
import { getHomePost, getTagInfo } from './../../posts'

export const fetchPostInfo = (pageSize, pageNum) => async dispatch => {
  const postInfo = await getHomePost(pageSize, pageNum)
  dispatch({
    type: at.GET_POST_INFO,
    data: postInfo
  })
}

export const initPostInfo = _ => ({
  type: at.INIT_POST_INFO
})

export const fetchNavInfo = () => async dispatch => {
  const navList = await getTagInfo()
  dispatch({
    type: at.GET_TAG_INFO,
    data: navList
  })
}
