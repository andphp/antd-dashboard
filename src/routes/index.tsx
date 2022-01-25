import React, { lazy, FC, useState, useEffect, Suspense, ReactNode } from 'react'

import Dashboard from '@/pages/dashboard'
import LoginPage from '@/pages/login'
// import SystemPage from '@/pages/system'
import LayoutPage from '@/pages/layout'
import WrapperRouteComponent from './config'
import { useRoutes, RouteObject, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spin } from 'antd'

// TODO: lazy加载组件，prolayout的菜单无法自动选中菜单项，原因不明
// const NotFound = lazy(() => import('@/pages/404'));
// const AccountPage = lazy(() => import('@/pages/account'));
const SystemPage = lazy(() => import('@/pages/system'))
const DomesticOrderPage = lazy(() => import('@/pages/order/domestic/index'))
const InternationalOrderPage = lazy(() => import('@/pages/order/international/index'))
const MenuManagement = lazy(() => import('@/pages/system/authority/menuManagement'))
const InterfaceManagement = lazy(() => import('@/pages/system/authority/interfaceManagement'))

import NotFound from '@/pages/404'
// import DomesticOrderPage from '@/pages/order/domestic/index'
// import InternationalOrderPage from '@/pages/order/international/index'
import OrderPage from '@/pages/order/index'
import NProgressWithNode from '@/components/nProgress'
import { GetMenuListState, SetMenuListState } from '@/stores/menu'
import { useGetCurrentMenus } from '@/api'
import TopLevelMenuPage from '@/pages/layout/components/TopLevelMenuPage'

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Spin tip={ `加载中、、、` }/> }>
    { children }
  </Suspense>
}

console.log('++++=====================================')

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/dashboard',
        element: <WrapperRouteComponent path='/dashboard' render={ props => <Dashboard { ...props }/>} />
      },
      {
        path: '/toplevelmenupage',
        element: <TopLevelMenuPage frompath='/toplevelmenupage' />
      },
      {
        path: '/system',
        element: <WrapperRouteComponent path='/system' render={() => <Outlet />}/>,
        children: [
          {
            path: 'authority',
            element: <Outlet />,
            children: [
              {
                path: 'menu',
                element: lazyLoad(<MenuManagement key='/system/authority/menu'/>)
              }, {
                path: 'interface',
                element: lazyLoad(<InterfaceManagement key='/system/authority/interface' />)
              }
            ]
          },
          {
            path: 'domestic',
            element: lazyLoad(<DomesticOrderPage />)
          }
        ]
      },
      {
        path: 'order',
        element: <WrapperRouteComponent path='/order' render={() => <Outlet />}/>,
        children: [
          {
            path: 'domestic',
            element: lazyLoad(<DomesticOrderPage />)
          }, {
            path: 'international',
            element: lazyLoad(<InternationalOrderPage />)
          }, {
            path: '*',
            element: <NotFound />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const RenderRouter: FC = () => {
  const element = useRoutes(routeList)

  return <NProgressWithNode path='/order/index' element={element }/>
}

export default RenderRouter
