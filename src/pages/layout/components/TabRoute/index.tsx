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

const { TabPane } = Tabs

const getTabPath = (tab: { location: { pathname: string }; params: Params<string> | undefined }) => generatePath(tab.location.pathname, tab.params)

const TabRoute = function() {
  const ele = useOutlet()

  const location = useLocation()

  const params = useParams()

  const navigate = useNavigate()

  const tabList = useRef(new Map())

  // 确保tab
  const updateTabList = useCreation(() => {
    const tab = tabList.current.get(location.pathname)
    const newTab = {
      name: location.pathname,
      key: location.pathname,
      // access:routeConfig.access,
      location
    }

    if (tab) {
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
      // onChange={(key) => selectTab(key)}
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
        <TabPane tab={item.name} key={item.key}>
          <Suspense fallback={<PageLoading />}><Outlet/></Suspense>
        </TabPane>
      ))}
    </Tabs>
  )
}

export default TabRoute
