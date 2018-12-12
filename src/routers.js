import React from 'react'
import Loadable from 'react-loadable'

const Loading = () => <div className="page-loading">Loading...</div>

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
