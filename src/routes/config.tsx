import React, { FC, useState, useEffect, ReactNode } from 'react'
import { Route } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'
import nProgress, { NProgress } from 'nprogress'

export interface WrapperRouteProps extends RouteProps {
  /** authorization？ */
  auth?: boolean;
  render: FC<ReactNode>;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, render, ...props }) => {
  useState(nProgress.start())
  useEffect(() => {
    nProgress.done()
    return () => nProgress.start()
  })
  // const { formatMessage } = useIntl()
  // const WitchRoute = auth ? PrivateRoute : Route
  return render({ ...props })
}

export default WrapperRouteComponent
