import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './style.css'

export class Aside extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor(props) {
    super(props)
  }

  accountList(items) {
    const list = items.map((t, i) => {
      return (
        <li key={i}>
          {t.text} :
          <a href={t.link} target="_blank">
            {t.link}
          </a>
        </li>
      )
    })
    return list
  }

  render() {
    const { avatar, name, email, account } = this.props.data
    return (
      <div className="aside-container">
        <img src={avatar} alt={name} className="aside-avatar" />
        <div className="aside-name">{name} </div>
        <div>
          email:
          {email}
        </div>
        <ul>{this.accountList(account)}</ul>
      </div>
    )
  }
}

export default Aside
