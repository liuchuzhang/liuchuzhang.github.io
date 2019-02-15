===

标题: Vue Router 权限控制
标签: Vue,vue-router

===

## 登录成功后存入的一些数据
- 当前登录时间 (开发环境在 30 分钟后切换路由自动退出) `t`
- token `token`
- 当前用户拥有的菜单 (访问当前路由的权限) `mu`

> 菜单权限和 token 验证
```js
router.beforeEach((to, form, next) => {
  const { path: routePath } = to
  const menuData = localStorageFn.get('mu') || ['/home']
  const pathname = routePath.indexOf('/') > -1 ? routePath.split('/')[1] : ''
  const menus = Array.isArray(menuData) ? menuData : ['/home'] // 所有权限菜单
  const isReject = pathname === '' ? false : !menus.includes(`/${pathname}`) // 是否 404
  if (!isUat) {
    let time = jscookie.get('t')
    let nowTime = new Date().getTime()
    let minute = Math.floor((nowTime - time) / (60 * 1000))
    const token = jscookie.get('token')
    const devFilters = ['login', '404'].includes(pathname) // 登录和 404 页面过滤

    if ((!token || token === '' || token === undefined) && to.name !== 'Login') {
      next({ path: '/login' })
    } else if (minute >= 30 && to.name !== 'Login') {
      // 30 分钟后退出
      jscookie.set('token', '')
      axios.defaults.headers['Access-Token'] = ''
      next({ path: '/login' })
    } else {
      if (isReject && !filters && to.name !== 'NotFound' && to.name !== 'Login') {
        if (isDev) {
          // 开发环境
          const { routes: allRoutes } = router.options
          const { length } = allRoutes
          const routerItem = length > 0 ? allRoutes.find(t => t.path === '/') : []
          const findItem = routerItem.children.find(r => r.path.indexOf(pathname) > -1)
          findItem ? next() : next({ path: '/404' })
        } else {
          // 测试环境
          next({ path: '/404' })
        }
      } else {
        next()
      }
    }
  } else {
    // 生产环境
    const uatFilters = ['home', '404'].includes(pathname)
    if (!uatFilters && isReject && to.name !== 'NotFound') {
      next({ path: '/404' })
    } else {
      next()
    }
  }
})
```
