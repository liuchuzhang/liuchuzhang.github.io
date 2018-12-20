import React from 'react'
import Loadable from 'react-loadable'
import { Spin, Icon } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
const Loading = () => <Spin indicator={antIcon} />

export const createRoutes = () => {
  const home = {
    path: '/',
    component: Loadable({
      loader: () => import('./containers/Home'),
      loading: Loading
    }),
    exact: true
  }

  const post = {
    path: '/tag/:tagName',
    component: Loadable({
      loader: () => import('./containers/TagList'),
      loading: Loading
    })
  }

  const article = {
    path: '/post/:postName',
    component: Loadable({
      loader: () => import('./containers/Article'),
      loading: Loading
    })
  }
  return [home, post, article]
}
