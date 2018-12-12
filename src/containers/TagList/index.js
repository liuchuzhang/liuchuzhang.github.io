import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as listAction from './actions'
import Nav from './../../components/Nav'
import Aside from './../../components/Aside'
import PostList from './../../components/PostList'
import configInfo from './../../config'
import { Link } from 'react-router-dom'
import { Button, BackTop, Breadcrumb } from 'antd'
import Back from './../../components/Back'

const mapStateToProps = ({ tagList }) => ({ tagList })

const mapDispatchToProps = dispatch => ({
  listAction: bindActionCreators(listAction, dispatch)
})
export class TagList extends Component {
  static propTypes = {
    tagList: PropTypes.object.isRequired,
    listAction: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.pageSize = 5
    this.pageNum = 1
  }

  // handleClick() {
  //   const {
  //     tagData: { postCount, tagInfo },
  //     postList,
  //     loadMore
  //   } = this.props.tagList.toJS()
  // }

  componentDidMount() {
    const { tagName } = this.props.match.params
    this.props.listAction.fetchTagInfo()
    this.props.listAction.setTagName(tagName)
    this.loadPage(1)
  }

  componentDidUpdate(prevProps) {
    let oldTag = prevProps.match.params.tagName
    let newTag = this.props.match.params.tagName

    if (newTag !== oldTag) {
      this.props.listAction.setTagName(newTag)
      this.loadPage(1)
    }
  }

  listRender(items) {
    const list = items.map((item, index) => {
      return <li key={index}>{item}</li>
    })
    return list
  }

  loadPage(pageNum) {
    const { tagName } = this.props.match.params
    this.props.listAction.fetchPostByTag(tagName, this.pageSize, pageNum)
    this.pageNum = pageNum
  }

  render() {
    const { tagName } = this.props.match.params

    const {
      tagData: { postCount, tagInfo },
      postList,
      loadMore
    } = this.props.tagList.toJS()

    const navList = [
      { tag: '全部文章', count: postCount, link: '/' },
      ...tagInfo
    ]

    const loadMoreBtn = loadMore ? (
      <Button
        size="large"
        className="load-more"
        onClick={() => this.loadPage(this.pageNum + 1)}
      >
        加载更多文章
      </Button>
    ) : (
      false
    )

    return (
      <div className="content">
        <Aside data={configInfo} />
        <div className="main-container">
          <Nav data={navList} activeTag={tagName} />
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{tagName}</Breadcrumb.Item>
          </Breadcrumb>
          <Back />
          <div className="main-box">
            <PostList data={postList} />
            {loadMoreBtn}
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
)(TagList)
