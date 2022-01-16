import React, { FC, useState, useEffect, ReactNode } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

import LoginPage from '@/pages/login'
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
  // const { formatMessage } = useIntl()
  const WitchRoute = auth ? <PrivateRoute render={ render}/> : render({ ...props })
  // return render({ ...props })
  return WitchRoute
}

export default WrapperRouteComponent
