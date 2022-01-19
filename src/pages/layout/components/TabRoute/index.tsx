import React, { useRef, Suspense } from 'react'
import { Tabs } from 'antd'

import _ from 'lodash'
import { useMemoizedFn, useCreation } from 'ahooks'

import {
  useOutlet,
  useNavigate,
  useLocation,
  generatePath,
  useParams,
  Params,
  Outlet
} from 'react-router-dom'

import { PageLoading } from '@ant-design/pro-layout'
import { useGetCurrentMenus } from '@/api'

const { TabPane } = Tabs

const getTabPath = (tab: { location: { pathname: string }; params: Params<string> | undefined }) => generatePath(tab.location.pathname, tab.params)

const TabRoute = function() {
  const ele = useOutlet()

  const location = useLocation()

  const params = useParams()

  const navigate = useNavigate()

  const tabList = useRef(new Map())
  const { data: menuList, error } = useGetCurrentMenus()
  const IsTopLevelMenu = (): boolean => {
    if (!menuList) return false
    const currentMenu = menuList.filter((menu) => (
      menu.path.toLowerCase() === location.pathname && menu?.children?.length
    ))
    return currentMenu.length > 0
  }
  // 确保tab
  const updateTabList = useCreation(() => {
    console.log('tablocation', location.pathname)
    const tab = tabList.current.get(location.pathname)
    const getFastTab = tabList.current.get('fastRouter')
    console.log('tab', tab)
    const newTab = {
      name: location.pathname,
      key: location.pathname,
      page: ele,
      // access:routeConfig.access,
      location,
      params
    }
    const fastTab = {
      name: '快捷导航',
      key: location.pathname,
      page: ele,
      // access:routeConfig.access,
      location,
      params
    }
    if (getFastTab) {
      tabList.current.delete('fastRouter')
    }
    if (IsTopLevelMenu()) {
      tabList.current.set('fastRouter', fastTab)
    } else if (tab) {
      if (tab.location.pathname !== location.pathname) {
        tabList.current.set(location.pathname, newTab)
      }
    } else {
      tabList.current.set(location.pathname, newTab)
    }
    console.log('location.ddpathname', location.pathname)
  }, [location])

  const closeTab = useMemoizedFn((selectKey) => {
    // 记录原真实路由,微前端可能修改
    if (tabList.current.size >= 2) {
      // tabList.current.delete(getTabMapKey(selectKey))
      tabList.current.delete(selectKey)
      const nextKey = _.last(Array.from(tabList.current.keys()))
      navigate(getTabPath(tabList.current.get(nextKey)), { replace: true })
    }
  })

  const selectTab = useMemoizedFn((selectKey) => {
    // 记录原真实路由,微前端可能修改
    // navigate(getTabPath(tabList.current.get(getTabMapKey(selectKey))), {
    navigate(getTabPath(tabList.current.get(selectKey)), {
      replace: true
    })
  })

  return (
    <Tabs
      // className={styles.tabs}
      // activeKey={generTabKey(location, matchPath)}
      activeKey={location.pathname}
      onChange={(key) => selectTab(key)}
      // tabBarExtraContent={operations}
      tabBarStyle={{ background: '#fff' }}
      tabPosition='top'
      animated
      tabBarGutter={-1}
      hideAdd
      type='editable-card'
      onEdit={(targetKey) => closeTab(targetKey)}
    >
      {[...tabList.current.values()].map((item) => (
        <TabPane style={{ paddingLeft: '16px' }} tab={item.name} key={item.key}>
          <Suspense fallback={<PageLoading />}>{item.page}</Suspense>
        </TabPane>
      ))}
    </Tabs>
  )
}

export default TabRoute
