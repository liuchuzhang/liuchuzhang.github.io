import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from './actions'
import Nav from './../../components/Nav'
import Aside from './../../components/Aside'
import PostList from './../../components/PostList'
import configInfo from './../../config'
import { Button, BackTop } from 'antd'

const mapStateToProps = ({ home }) => ({ home })

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch)
})

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.pageSize = 5
    this.pageNum = 1
  }

  componentDidMount() {
    this.props.homeActions.fetchNavInfo()
    this.props.homeActions.initPostInfo()
    this.loadPage(1)
  }

  loadPage(pageNum) {
    this.props.homeActions.fetchPostInfo(this.pageSize, pageNum)
    this.pageNum = pageNum
  }

  listRender(items) {
    const list = items.map((item, index) => {
      return <li key={index}>{item}</li>
    })
    return list
  }

  render() {
    const {
      tagData: { postCount, tagInfo },
      postList,
      loadMore
    } = this.props.home.toJS()

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
          <Nav data={navList} activeTag={`全部文章`} />
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
)(Home)
