import { sortBy } from 'lodash'
import axios from 'axios'

let postList = {},
	tag = {}
export const getPostList = async () => {
	if (!postList.data) {
		postList = await axios.get('/data.json')
	}
	return postList.data
}

export const getTagInfo = async () => {
	if (!tag.data) {
		tag = await axios.get('/tag.json')
	}
	return tag.data
}

const PAGE_SIZE = 10
const INIT_PAGE = 1

export const getPostByTag = async (tagName, pageSize = PAGE_SIZE, page = INIT_PAGE, reverse = true) => {
	const postList = await getPostList()

	const filterList = postList.filter(t => t.tag.includes(tagName))
	const rev = reverse ? -1 : 1
	const collection = sortBy(filterList, t => rev * Date.parse(t.time))

	return {
		tagName,
		total: collection.length,
		posts: collection.slice(pageSize * (page - 1), pageSize * page),
		pageSize,
		curPage: page,
	}
}

export const getHomePost = async (pageSize = PAGE_SIZE, page = INIT_PAGE, reverse = true) => {
	const postList = await getPostList()

	const filterList = postList
	const rev = reverse ? -1 : 1
	const collection = sortBy(filterList, t => rev * Date.parse(t.time))

	return {
		total: collection.length,
		posts: collection.slice(pageSize * (page - 1), pageSize * page),
		pageSize,
		curPage: page,
	}
}

export const fetchPost = async postName => {
	const postList = await getPostList()
	return postList.find(p => p.url.includes(postName))
}

export const getRankList = async () => {
	const tagData = await getTagInfo()
	// const tagList = postList.map(p => p.tag)
	// const rankList = tagList.reduce((current, r, t) => {
	// 	const currentTags = current.map(t => t.tag)
	// 	if (currentTags.includes(t => t.tag === r)) {
	// 		current.forEach(item => {
	// 			if (item.tag === r) {
	// 				item.count += 1
	// 			}
	// 		})
	// 		return current
	// 	}
	// 	current.push({
	// 		tag: r,
	// 		count: 1,
	// 	})

	// 	console.log(current)
	// 	return current
	// }, [])

	const collection = sortBy(tagData.tagInfo, t => -t.count)
	return collection
}
