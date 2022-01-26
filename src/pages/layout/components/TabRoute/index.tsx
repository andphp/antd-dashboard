import React, { useRef, Suspense, useEffect, useState } from 'react'
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
import { FullscreenExitOutlined, FullscreenOutlined, VerticalRightOutlined, VerticalLeftOutlined, ColumnWidthOutlined, RedoOutlined } from '@ant-design/icons'
import { PageLoading } from '@ant-design/pro-layout'
import { useGetCurrentMenus } from '@/api'
import { GetMenuListState, SetMenuListState } from '@/stores/menu'
import { useLocale } from '@/locales'

const { TabPane } = Tabs
const getTabPath = (tab: { location: { pathname: string }; params: Params<string> | undefined }) => generatePath(tab.location.pathname, tab.params)
const TabRoute = function(clickChange: React.MouseEventHandler<HTMLElement> | undefined, isShow: undefined) {
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

    if (currentPath === null) {
      return null
    }
    if (currentPath.path.split('/').length - 1 === 1) {
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

  const tabsDivId = useRef('antd-tabs-menu')
  const [showArrow, setShowArrow] = useState(false)
  // 右箭头点击事件
  const rightButton = () => {
    const tabList = document.getElementById(tabsDivId.current).children[0].children[1].children[0]
    const tabsNav = document.getElementById(tabsDivId.current).children[0].children[1]
    // 计算偏移量
    if (tabList.clientWidth > tabsNav.clientWidth) {
      const translateX = Number(tabList.style.cssText.split('px')[0].split('(')[1]) - tabsNav.clientWidth
      if (Math.abs(translateX) < (tabList.clientWidth - tabsNav.clientWidth)) {
        tabList.style.cssText = 'transform: translate(' + translateX + 'px, 0px);'
      } else {
        tabList.style.cssText = 'transform: translate(' + -(tabList.clientWidth - tabsNav.clientWidth + 0) + 'px, 0px);'
      }
    }
  }
  // 左箭头点击事件
  const leftButton = () => {
    const tabList = document.getElementById(tabsDivId.current).children[0].children[1].children[0]
    const tabsNav = document.getElementById(tabsDivId.current).children[0].children[1]
    if (tabList.clientWidth > tabsNav.clientWidth) {
      const translateX = Number(tabList.style.cssText.split('px')[0].split('(')[1]) + tabsNav.clientWidth

      if (Math.abs(translateX) < (tabList.clientWidth - tabsNav.clientWidth) && translateX < 0) {
        tabList.style.cssText = 'transform: translate(' + translateX + 'px, 0px);'
      } else {
        tabList.style.cssText = 'transform: translate(' + 0 + 'px, 0px);'
      }
    }
  }
  const operations = {
    left: <>
      {showArrow ? <Button type='link' icon={ <VerticalRightOutlined />} onClick={leftButton} /> : ''}
    </>,
    right: <>
      {showArrow ? <Button type='link' icon={ <VerticalLeftOutlined />} onClick={rightButton} /> : ''}
      <Button type='link' icon={<ColumnWidthOutlined />} />
      <Button type='link' icon={<RedoOutlined />} />
      <Button style={{ marginRight: '8px' }} type='link' icon={isShow ? <FullscreenOutlined /> : <FullscreenExitOutlined />} onClick={clickChange}/>
    </>
  }

  useEffect(() => {
    // 所有tabs标签宽度
    const tabListWidth = document.getElementById(tabsDivId.current).children[0].children[1].children[0].clientWidth
    // tabs 可视区域宽度
    const tabsNavWidth = document.getElementById(tabsDivId.current).children[0].children[1].clientWidth
    // console.log('tabListWidth', tabListWidth)
    // console.log('tabsNavWidth', tabsNavWidth)
    if (tabListWidth - tabsNavWidth > 0) {
      setShowArrow(true)
    } else {
      setShowArrow(false)
    }
  })

  return (<Tabs
    id={tabsDivId.current}
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
