import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Icon } from 'antd'
import './style.css'

export class Nav extends Component {
  static propTypes = {
    data: PropTypes.array,
    activeTag: PropTypes.string
  }

  static defaultProps = {
    data: [],
    activeTag: ''
  }

  handleClick() {
    const tagName = this.props.activeTag
    const activeTag = this.state.navs.find(t => t.tag === tagName)
    Array.prototype.insert = function(index, ele) {
      return this.splice(index, 0, ele)
    }

    if (activeTag) {
      const items = this.state.navs.filter(t => t.tag !== activeTag)
      items.insert(1, activeTag)
      this.setState({
        navs: items
      })
    }
  }

  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps')
  //   console.log(this.props.data)
  //   this.setState({
  //     navs: this.props.data
  //   })
  //   console.log(this.state.navs)
  // }

  constructor(props) {
    super(props)
    this.navTagNum = 6
    this.state = {
      navs: []
    }
  }

  renderList() {
    const topList = this.props.data.slice(0, this.navTagNum - 1)

    const topItems = topList.map((t, i) => {
      return (
        <Link
          to={t.link ? t.link : `/tag/${t.tag}`}
          className={`ant-dropdown-link ${
            this.props.activeTag === t.tag ? 'active' : ''
          }`}
          key={i}
        >
          {t.tag}({t.count})
        </Link>
      )
    })

    const navItems = (
      <div className="nav-container">
        {topItems}
        {this.renderMore()}
      </div>
    )

    return navItems
  }

  renderMore() {
    const navItems = this.props.data.slice(this.navTagNum).map((t, i) => {
      return (
        <Menu.Item key={i}>
          <Link
            to={t.link ? t.link : `/tag/${t.tag}`}
            className={`ant-dropdown-link ${
              this.props.activeTag === t.tag ? 'active' : ''
            }`}
          >
            {t.tag}({t.count})
          </Link>
        </Menu.Item>
      )
    })

    const navMenu = <Menu>{navItems}</Menu>

    const dropdownMenu = (
      <Dropdown overlay={navMenu}>
        <div className="header-nav-item">
          更多分类 <Icon type="down" />
        </div>
      </Dropdown>
    )
    return dropdownMenu
  }

  render = () => this.renderList()
}

export default Nav
