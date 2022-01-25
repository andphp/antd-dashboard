import React, { useRef, Suspense } from 'react'
import { Button, Tabs } from 'antd'

import _ from 'lodash'
import { useMemoizedFn, useCreation } from 'ahooks'

import {
  useOutlet,
  useNavigate,
  useLocation,
  generatePath,
  useParams,
  Params
} from 'react-router-dom'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { PageLoading } from '@ant-design/pro-layout'
import { useGetCurrentMenus } from '@/api'
import { GetMenuListState, SetMenuListState } from '@/stores/menu'
import { useLocale } from '@/locales'
import screenfull from 'screenfull'
const { TabPane } = Tabs
const getTabPath = (tab: { location: { pathname: string }; params: Params<string> | undefined }) => generatePath(tab.location.pathname, tab.params)
const TabRoute = function() {
  const ele = useOutlet()

  const location = useLocation()

  const params = useParams()

  const navigate = useNavigate()

  const tabList = useRef(new Map())
  const { formatMessage } = useLocale()

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

  const screenfullToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }
  // 初始化菜单路由
  const { data: menuList, error } = useGetCurrentMenus()
  // 确保tab
  const updateTabList = useCreation(() => {
    // 初始化菜单路由
    if (GetMenuListState(location.pathname) === null) {
      initMenuList(location.pathname, menuList)
    }

    const tab = tabList.current.get(location.pathname)
    const currentPath = GetMenuListState(location.pathname)

    const newTab = {
      name: currentPath ? (
        currentPath.locale ? formatMessage({ id: currentPath.locale }) : currentPath.name
      ) : location.pathname,
      key: location.pathname,
      page: ele,
      // access:routeConfig.access,
      location,
      params
    }

    const getFastTab = tabList.current.get('fastRouter')
    if (getFastTab !== null) {
      tabList.current.delete('fastRouter')
    }

    if (currentPath && currentPath.path.split('/').length - 1 === 1) {
      const topMenuPageTab = {
        name: '快捷导航',
        key: location.pathname,
        page: ele,
        // access:routeConfig.access,
        location,
        params
      }
      tabList.current.set('fastRouter', topMenuPageTab)
    } else if (tab) {
      if (tab.location.pathname !== location.pathname) {
        tabList.current.set(location.pathname, newTab)
      }
    } else {
      tabList.current.set(location.pathname, newTab)
    }
  }, [location])

  const closeTab = useMemoizedFn((selectKey) => {
    if (tabList.current.size >= 2) {
      tabList.current.delete(selectKey)
      const nextKey = _.last(Array.from(tabList.current.keys()))
      navigate(getTabPath(tabList.current.get(nextKey)), { replace: true })
    }
  })

  const selectTab = useMemoizedFn((selectKey) => {
    navigate(getTabPath(tabList.current.get(selectKey)), {
      replace: true
    })
  })

  const operations = {
    left: <Button>《</Button>, right: <>
      <Button>》</Button>
      <Button>O  </Button>
      <Button type='link' icon={screenfull.isFullscreen ? <ShrinkOutlined/> : <ArrowsAltOutlined/>} onClick={screenfullToggle}/>
      <Button>X </Button>
    </>
  }

  return (<Tabs
    activeKey={location.pathname}
    onChange={(key) => selectTab(key)}
    tabBarExtraContent={operations}
    tabBarStyle={{ background: '#fff' }}
    tabPosition='top'
    animated
    tabBarGutter={0}
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

export default TabRoute
