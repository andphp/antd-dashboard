import React, { lazy, FC, useState, useEffect, Suspense, ReactNode } from 'react'

import Dashboard from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import SystemPage from '@/pages/system'
import LayoutPage from '@/pages/layout'
import WrapperRouteComponent from './config'
import { useRoutes, RouteObject } from 'react-router-dom'
import { Spin } from 'antd'
import { Routes } from 'react-router-dom'
// TODO: lazy加载组件，prolayout的菜单无法自动选中菜单项，原因不明
// const NotFound = lazy(() => import('@/pages/404'));
// const AccountPage = lazy(() => import('@/pages/account'));
// const Project = lazy(() => import('@/pages/project'));

import NotFound from '@/pages/404'

// const lazyLoad = (children: ReactNode): ReactNode => {
//   return <Suspense fallback={<Spin tip={ `加载中、、、` }/> }>
//     { children }
//   </Suspense>
// }

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
        element: <WrapperRouteComponent auth={ true} path='/system' render={props => <SystemPage { ...props }/>}/>
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
  console.log('element', element)
  return element
}

export default RenderRouter
