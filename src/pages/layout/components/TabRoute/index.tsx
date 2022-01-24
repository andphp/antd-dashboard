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
import { IsTopLevelMenu } from '@/utils/helper'
import { GetMenuListState, SetMenuListState } from '@/stores/menu'
import TopLevelMenuPage from '../TopLevelMenuPage'

const { TabPane } = Tabs

const getTabPath = (tab: { location: { pathname: string }; params: Params<string> | undefined }) => generatePath(tab.location.pathname, tab.params)

const TabRoute = function() {
  const ele = useOutlet()

  const location = useLocation()

  const params = useParams()

  const navigate = useNavigate()

  const tabList = useRef(new Map())

  const initMenuList = (pathname: string, menuList: any[] | undefined) => {
    if (!menuList) return false
    menuList.forEach((m) => {
      if (m?.path == pathname) {
        SetMenuListState(pathname, m)
        return true
      }
      if (m?.children?.length) {
        return initMenuList(pathname, m.children)
      }
    })
    return false
  }
  // 初始化菜单路由
  const { data: menuList, error } = useGetCurrentMenus()
  // 确保tab
  const updateTabList = useCreation(() => {
    console.log('tabRoute=====', location.pathname)
    // 初始化菜单路由
    if (GetMenuListState(location.pathname) === null) {
      console.log('tabRoute===GetMenuListState===')
      initMenuList(location.pathname, menuList)
    }

    const tab = tabList.current.get(location.pathname)
    const getFastTab = tabList.current.get('fastRouter')
    console.log('tabRoute===tab', tab)
    const newTab = {
      name: location.pathname,
      key: location.pathname,
      page: ele,
      // access:routeConfig.access,
      location,
      params
    }

    if (tab) {
      if (tab.location.pathname !== location.pathname) {
        tabList.current.set(location.pathname, newTab)
      }
    } else {
      tabList.current.set(location.pathname, newTab)
    }
    console.log('tabRoute===tabroute.pathname', location.pathname)
  }, [location])

  const reanderNode = () => {
    const currentPath = GetMenuListState(location.pathname)
    if (currentPath && currentPath?.level === 1) {
      console.log('currentPath=+++++', currentPath)
      return (<TopLevelMenuPage frompath={currentPath.path} />)
    } else {
      return (<Tabs
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
      </Tabs>)
    }
  }

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

  return reanderNode()
}

export default TabRoute
