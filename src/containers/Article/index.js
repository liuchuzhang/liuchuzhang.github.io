import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as articleActions from './actions'
import Nav from './../../components/Nav'
import Aside from './../../components/Aside'
import configInfo from './../../config'
import Markdown from './../../components/Markdown'
import MarkDownNav from 'markdown-navbar'
// MarkDownNav catch: index.js:191 Uncaught TypeError: Cannot read property 'offsetTop' of null at index.js:191
import { Link } from 'react-router-dom'
import Back from './../../components/Back'
// import RankList from './../../components/RankList'
import { BackTop, Breadcrumb } from 'antd'
import 'markdown-navbar/dist/navbar.css'
import './style.css'
// var Remarkable = require('remarkable')
// var toc = require('markdown-toc')
// import toc from 'markdown-toc'

const mapStateToProps = ({ article }) => ({ article })

const mapDispatchToProps = dispatch => ({
	articleActions: bindActionCreators(articleActions, dispatch),
})

export class Article extends Component {
	static propTypes = {
		article: PropTypes.object.isRequired,
		articleActions: PropTypes.object.isRequired,
	}

	// constructor(props) {
	//   super(props)
	// }

	componentDidMount() {
		const { postName } = this.props.match.params
		this.props.articleActions.fetchPostContent(postName)
		this.props.articleActions.fetchNavInfo()
		this.props.articleActions.fetchRankList()
	}

	listRender(items) {
		const list = items.map((item, index) => {
			return <li key={index}>{item}</li>
		})
		return list
	}

	componentDidUpdate() {
		// const {
		// 	postContent: { title, time, tag, content },
		// } = this.props.article.toJS()

		// if (content) {
		// 	const markdownJson = toc(content)

		// 	console.log(markdownJson)
		// }

		// console.log(this.props.article.toJS())
	}

	tagItems(items) {
		const tagItems = items.map((t, i) => {
			return (
				<Link to={`/tag/${t}`} key={i}>
					<span className="item">{t}</span>
				</Link>
			)
		})
		return tagItems
	}

	render() {
		const {
			tagData: { postCount, tagInfo },
			postContent: { title, time, tag, content },
			rankList: rankList,
		} = this.props.article.toJS()

		const navList = [{ tag: '全部文章', count: postCount, link: '/' }, ...tagInfo]
		return (
			<div className="content">
				<Aside data={configInfo} />
				<div className="main-container">
					<Nav data={navList} />
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/">首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{title ? title : '标题加载中...'}</Breadcrumb.Item>
					</Breadcrumb>
					<Back />

					{/* <RankList data={rankList} /> */}
					<div className="main-box">
						<div className="article-title">
							<h1>{title ? title : '标题加载中...'}</h1>
							<div className="tag-items">
								<span>标签：</span>
								{this.tagItems(tag)}
							</div>
							<div className="create-time">
								<span>创建时间：</span>
								{time}
							</div>
						</div>
						<div className="article-content">
							<div className="article-inner">
								{content ? <Markdown source={content} /> : <h3>内容加载中...</h3>}
							</div>
							<div className="article-nav">
								<MarkDownNav className="article-menu" source={content} headingTopOffset={80} />
							</div>
						</div>
					</div>
				</div>
				<BackTop />
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Article)
