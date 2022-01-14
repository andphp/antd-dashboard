import React, { FC, useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { RouteProps } from 'react-router'
import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'
import nprogress from 'nprogress'

export interface WrapperRouteProps extends RouteProps {
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, ...props }) => {
  useState(nprogress.start())
  useEffect(() => {
    nprogress.done()
    return () => nprogress.start()
  })
  const { formatMessage } = useIntl()
  const WitchRoute = auth ? PrivateRoute : Route
  return <WitchRoute {...props} />
}

export default WrapperRouteComponent
