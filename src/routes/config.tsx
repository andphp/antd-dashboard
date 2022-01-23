import React, { FC, useState, useEffect, ReactNode } from 'react'
import { Route, Navigate, useLocation } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

import LoginPage from '@/pages/login'
import { useGetCurrentMenus } from '@/api'
import TopLevelMenuPage from '@/pages/layout/components/TopLevelMenuPage'
import { IsTopLevelMenu } from '@/utils/helper'
import { GetMenuListState, SetMenuListState } from '@/stores/menu'
export interface WrapperRouteProps extends RouteProps {
  /** authorization？ */
  auth?: boolean;
  render: FC<ReactNode>;
  path: string;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, path, render, ...props }) => {
  // const { formatMessage } = useIntl()
  const WitchRoute = auth ? <PrivateRoute render={render} /> : render({ ...props })

  // return render({ ...props })
  console.log('=====sss========eee', IsTopLevelMenu(path), path)
  return <TopLevelMenuPage path={ path} children={WitchRoute}/>
}

export default WrapperRouteComponent
