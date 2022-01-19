import React, { FC, useState, useEffect, ReactNode } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

import LoginPage from '@/pages/login'
import { useGetCurrentMenus } from '@/api'
import TopLevelMenuPage from '@/pages/layout/components/TopLevelMenuPage'
export interface WrapperRouteProps extends RouteProps {
  /** authorization？ */
  auth?: boolean;
  render: FC<ReactNode>;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, render, ...props }) => {
  // Verify login
  const isSignIn = true
  if (!isSignIn) {
    return <Navigate to='/login' />
  }
  const { data: menuList, error } = useGetCurrentMenus()
  const IsTopLevelMenu = (): boolean => {
    if (!menuList) return false
    const currentMenu = menuList.filter((menu) => (
      menu.path.toLowerCase() === location.pathname && menu?.children?.length
    ))
    return currentMenu.length > 0
  }
  // const { formatMessage } = useIntl()
  const WitchRoute = auth ? <PrivateRoute render={ render}/> : render({ ...props })
  // return render({ ...props })
  return IsTopLevelMenu() ? <TopLevelMenuPage children={WitchRoute}/> : WitchRoute
}

export default WrapperRouteComponent
