import { useGetCurrentMenus } from '@/api'
import { useLocale } from '@/locales'
import { MenuChild, MenuList } from '@/models/menu.interface'
import { userState } from '@/stores/user'
import { FrownOutlined, HeartOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined } from '@ant-design/icons'
import type { MenuDataItem } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import { createBrowserHistory } from 'history'
import React, { FC, useEffect, useState } from 'react'
import { Link, matchRoutes, Outlet, RouteObject, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { useGuide } from '../guide/useGuide'
import Footer from './components/Footer'
import RightContent from './components/RightContent'
import TabRoute from './components/TabRoute'
import styles from './index.module.less'
import _ from 'lodash'
import memoized from 'nano-memoize'
import { GetMenuListState, SetMenuListState } from '@/stores/menu'
const history = createBrowserHistory()

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />
}

const LayoutPage: FC = ({ children }) => {
  const { data: menuList, error } = useGetCurrentMenus()

  const [user, setUser] = useRecoilState(userState)
  const [pathname, setPathname] = useState('/welcome')
  const { device, collapsed, newUser, settings } = user
  const isMobile = device === 'MOBILE'
  const { driverStart } = useGuide()
  const location = useLocation()
  const navigate = useNavigate()
  const { formatMessage } = useLocale()
  useEffect(() => {
    console.log('layout---useEffect', location)

    if (location.pathname === '/') {
      navigate('/dashboard')
    }
  }, [navigate, location])

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed })
  }

  useEffect(() => {
    newUser && driverStart()
  }, [newUser])

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return []

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      hideInBreadcrumb: false,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children)
    }))

    return m
  }

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname
      }}
      contentStyle={{ margin: 0 }}
      {...settings}
      onCollapse={toggle}
      formatMessage={formatMessage}
      onMenuHeaderClick={() => history.push('/')}
      headerTitleRender={(logo, title, props) => (
        <a
          className={styles.layoutPageHeader}
        >
          {logo}
          {title}
        </a>
      )}

      headerHeight={58}
      // menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' })
        },
        ...routers
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        )
      }}
      menuDataRender={() => loopMenuItem(menuList)}
      // menuDataRender={() => m}
      rightContentRender={() => <RightContent />}
      footerRender={() => <Footer />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            <span id='sidebar-trigger'>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        )
      }}
    >
      <>
        <TabRoute />
        {console.log('layout---------------------------------------')}
      </>
    </ProLayout>
  )
}

export default LayoutPage

