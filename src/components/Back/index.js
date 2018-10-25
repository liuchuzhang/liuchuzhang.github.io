import React, { Component } from 'react'
import { Button } from 'antd'
import './style.css'

export class Back extends Component {
  back() {
    window.history.go(-1)
  }

  render() {
    return (
      <Button size="large" type="normal" icon="left" onClick={this.back} className="back-btn">
        返回
      </Button>
    )
  }
}

export default Back
