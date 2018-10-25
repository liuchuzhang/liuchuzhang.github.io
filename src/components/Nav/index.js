import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Icon } from 'antd'
import randomId from './../../utils/randomId'
import './style.css'

export class Nav extends Component {
  static propTypes = {
    data: PropTypes.array,
    activeTag: PropTypes.string
  }

  static defaultProps = {
    data: []
  }

  constructor(props) {
    super(props)
    this.navTagNum = 5
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
          key={`nav_${randomId()}`}
        >
          {t.tag}({t.count})
        </Link>
      )
    })

    const navItems = (
      <div className="nav-container">
        {topItems}
        {this.props.data.slice(this.navTagNum).length
          ? this.renderMore()
          : false}
      </div>
    )

    return navItems
  }

  renderMore() {
    const navItems = this.props.data.slice(this.navTagNum).map((t, i) => {
      return (
        <Menu.Item key={`nav_${randomId()}`}>
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
      <Dropdown overlay={navMenu} key={`nav_${randomId()}`}>
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
