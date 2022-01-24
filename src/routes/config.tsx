import React, { FC, useState, useEffect, ReactNode } from 'react'
import { Route, useNavigate } from 'react-router-dom'
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
  path: string
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, path, render, ...props }) => {
  // const { formatMessage } = useIntl()

  const WitchRoute = auth ? <PrivateRoute render={ render}/> : render({ ...props })

  // return render({ ...props })

  return WitchRoute
}

export default WrapperRouteComponent
