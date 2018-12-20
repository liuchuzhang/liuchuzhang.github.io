import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import randomImages from './images'
import './style.css'

export class PostList extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  static defaultProps = {
    data: []
  }

  // constructor(props) {
  //   super(props)
  // }

  articleImage(t, i) {
    let image = t
    if (!t) {
      image = randomImages[i % randomImages.length]
    }
    return image
  }

  tagItems(tags) {
    const items = tags.map((t, i) => {
      return (
        <Link to={`/tag/${t}`} key={i}>
          <span className="item">{t}</span>
        </Link>
      )
    })
    return items
  }

  render() {
    const postItems = this.props.data.map((t, i) => {
      return (
        <article className="article-item" key={i}>
          <Link to={t.url}>
            {/* 随机图片 非随机的 `key` 为 `image` */}
            <img src={this.articleImage(t.s, i)} alt={t.title} />
          </Link>
          <div className="tag-items">{this.tagItems(t.tag)}</div>
          <Link to={t.url}>
            <h3>{t.title}</h3>
          </Link>
          <p>{t.time}</p>
        </article>
      )
    })

    const postList = (
      <div className="post-list">
        {postItems.length ? postItems : <h3>正在加载...</h3>}
      </div>
    )

    return postList
  }
}

export default PostList
