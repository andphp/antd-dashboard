import React, { lazy, FC, useState, useEffect, Suspense, ReactNode } from 'react'

import Dashboard from '@/pages/dashboard'
import LoginPage from '@/pages/login'
// import SystemPage from '@/pages/system'
import LayoutPage from '@/pages/layout'
import WrapperRouteComponent from './config'
import { useRoutes, RouteObject, Navigate, Outlet } from 'react-router-dom'
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

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Spin tip={ `加载中、、、` }/> }>
    { children }
  </Suspense>
}

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent auth={ false} path='/' render={ props => <LayoutPage { ...props }/>} />,
    children: [
      {
        path: '/dashboard',
        element: <WrapperRouteComponent path='/dashboard' render={ props => <Dashboard { ...props }/>} />
      },
      {
        path: '/system',
        element: <WrapperRouteComponent path='/system' render={() => <Outlet />}/>,
        children: [
          {
            path: 'authority',
            element: <WrapperRouteComponent path='/system/authority' render={() => <Outlet />}/>,
            children: [
              {
                path: 'menu',
                element: lazyLoad(<WrapperRouteComponent path='/system/authority/menu' render={props => <MenuManagement index={true} { ...props }/>}/>)
              }, {
                path: 'interface',
                element: lazyLoad(<WrapperRouteComponent path='/system/authority/interface' render={props => <InterfaceManagement { ...props }/>}/>)
              }
            ]
          }
        ]
      },
      {
        path: 'order',
        element: <WrapperRouteComponent path='/order/domestic' render={() => <Outlet />}/>,
        children: [
          {
            path: 'domestic',
            element: lazyLoad(<WrapperRouteComponent path='/order/domestic' render={props => <DomesticOrderPage { ...props }/>}/>)
          }, {
            path: 'international',
            element: lazyLoad(<WrapperRouteComponent path='/order/international' render={props => <InternationalOrderPage { ...props }/>}/>)
          }, {
            path: '*',
            element: <div>ddss</div>
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
