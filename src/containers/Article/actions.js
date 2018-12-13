import * as at from './actionTypes'
import { fetchPost, getTagInfo, getRankList } from './../../posts'

export const fetchPostContent = postName => async dispatch => {
	const postContent = await fetchPost(postName)
	dispatch({
		type: at.GET_POST_CONTENT,
		data: postContent,
	})
}

export const fetchNavInfo = () => async dispatch => {
	const navList = await getTagInfo()
	dispatch({
		type: at.GET_TAG_INFO,
		data: navList,
	})
}

export const fetchRankList = () => async dispatch => {
	const rankList = await getRankList()
	dispatch({
		type: at.GET_RANK,
		data: rankList,
	})
}
