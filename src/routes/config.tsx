import React, { FC, ReactNode } from 'react'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import TopLevelMenuPage from '@/pages/layout/components/TopLevelMenuPage'
export interface WrapperRouteProps extends RouteProps {
  /** authorization？ */
  auth?: boolean;
  render: FC<ReactNode>;
  path: string,
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, path, render, ...props }) => {
  const WitchRoute = auth ? <PrivateRoute render={ render}/> : render({ ...props })
  if (path.split('/').length - 1 === 1 && location.pathname === path) {
    return <TopLevelMenuPage frompath={path} />
  }
  return WitchRoute
}

export default WrapperRouteComponent
