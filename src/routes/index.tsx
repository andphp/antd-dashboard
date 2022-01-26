import React, { lazy, FC, Suspense, ReactNode } from 'react'

import Dashboard from '@/pages/dashboard'
import LoginPage from '@/pages/login'
import LayoutPage from '@/pages/layout'
import WrapperRouteComponent from './config'
import { useRoutes, RouteObject, Outlet } from 'react-router-dom'
import { Spin } from 'antd'

// TODO: lazy加载组件
// const NotFound = lazy(() => import('@/pages/404'));
// const AccountPage = lazy(() => import('@/pages/account'));
const DomesticOrderPage = lazy(() => import('@/pages/order/domestic/index'))
const InternationalOrderPage = lazy(() => import('@/pages/order/international/index'))
const MenuManagement = lazy(() => import('@/pages/system/authority/menuManagement'))
const InterfaceManagement = lazy(() => import('@/pages/system/authority/interfaceManagement'))

import NotFound from '@/pages/404'
import NProgressWithNode from '@/components/nProgress'
import TopLevelMenuPage from '@/pages/layout/components/TopLevelMenuPage'
import Test1 from '@/pages/test1'
import Test2 from '@/pages/test2'
import Test3 from '@/pages/test3'
import Test4 from '@/pages/test4'
import Test5 from '@/pages/test5'
import Test6 from '@/pages/test6'
import Test7 from '@/pages/test7'

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Spin tip={ `加载中、、、` }/> }>
    { children }
  </Suspense>
}

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
        element: <WrapperRouteComponent auth={ false} path='/system' render={() => <Outlet />}/>,
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
            path: 'test1',
            element: lazyLoad(<Test1 />)
          },
          {
            path: 'test2',
            element: lazyLoad(<Test2 />)
          },
          {
            path: 'test3',
            element: lazyLoad(<Test3 />)
          },
          {
            path: 'test4',
            element: lazyLoad(<Test4 />)
          },
          {
            path: 'test5',
            element: lazyLoad(<Test5 />)
          },
          {
            path: 'test6',
            element: lazyLoad(<Test6 />)
          },
          {
            path: 'test7',
            element: lazyLoad(<Test7 />)
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
