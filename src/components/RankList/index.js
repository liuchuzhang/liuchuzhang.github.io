import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import './style.css';

export class RankList extends Component {
  static propTypes = {
    data: PropTypes.array,
  };

  static defaultProps = {
    data: [],
  };

  render() {
    const rankList = (
      <div className="rank-list-container">
        <List
          itemLayout="horizontal"
          className="rank-list"
          dataSource={this.props.data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={<Link to={item.tag ? `/tag/${item.tag}` : '/'}>{item.tag}</Link>} />
              <div>{item.count ? item.count : '0'}</div>
            </List.Item>
          )}
        />
      </div>
    );

    return rankList;
  }
}

export default RankList;
