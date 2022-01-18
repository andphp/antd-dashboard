import React, { useRef, Suspense } from 'react'
import { Tabs } from 'antd'
// import Lru from "@/utils/lru";
import _ from 'lodash'
import { useMemoizedFn, useCreation } from 'ahooks'
// import { useWhyDidYouUpdate } from 'ahooks';

import {
  useOutlet,
  useNavigate,
  useLocation,
  generatePath,
  useParams,
  Params
} from 'react-router-dom'

import { PageLoading } from '@ant-design/pro-layout'

const { TabPane } = Tabs

const getTabPath = (tab: { location: { pathname: string }; params: Params<string> | undefined }) => generatePath(tab.location.pathname, tab.params)

// tab的select key = location.pathname + , + matchpath
// 以此解决 微端情况下 tab 的 key 相同导致页面可能丢失的问题。
// const generTabKey = memoized((location: { pathname: any }, matchpath: any) => `${location.pathname},${matchpath}`)

// 从key中返回 ,号后面的字符
// const getTabMapKey = memoized((key: string) => key.substring(key.indexOf(',') + 1, key.length))

const TabRoute = function(props: { routeConfig: any; matchPath: any }) {
  const { routeConfig, matchPath } = props

  const ele = useOutlet()

  const location = useLocation()

  const params = useParams()

  const navigate = useNavigate()

  const tabList = useRef(new Map())

  // 确保tab
  const updateTabList = useCreation(() => {
    const tab = tabList.current.get(matchPath)
    const newTab = {
      name: routeConfig.name,
      // key: generTabKey(location, matchPath),
      page: ele,
      // access:routeConfig.access,
      location,
      params
    }
    // console.log("tabList is",tabList);
    // console.log("cur tab is:",tab);
    // console.log('match matchPath is',matchPath);
    // console.log('params is',params);
    // console.log('location is',location);
    // console.log('ele is',ele);
    if (tab) {
      // 处理微前端情况，如发生路径修改则替换
      // 还要比较参数
      // 微端路由更新 如果key不更新的话。会导致页面丢失..
      if (tab.location.pathname !== location.pathname) {
        tabList.current.set(matchPath, newTab)
      }
    } else {
      tabList.current.set(matchPath, newTab)
    }
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
      activeKey={routeConfig}
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
        <TabPane tab={item.path} key={item.path}>
          <Suspense fallback={<PageLoading />}>{item.page}</Suspense>
        </TabPane>
      ))}
    </Tabs>
  )
}

export default TabRoute
