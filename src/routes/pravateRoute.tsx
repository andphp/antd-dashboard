import React, { FC, ReactNode } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'
import { useLocale } from '@/locales'
import { RouteProps, useLocation } from 'react-router'
import { Logged } from '@/utils/helper'
export interface PrivateRouteProps extends RouteProps {
  render: FC<ReactNode>;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ render, ...props }) => {
  const logged = Logged()
  const navigate = useNavigate()
  const { formatMessage } = useLocale()
  const location = useLocation()

  return logged ? render({ ...props }) : (
    <Result
      status='403'
      title='403'
      subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
      extra={
        <Button
          type='primary'
          onClick={() => navigate('/login', { replace: true, state: { from: location.pathname }})}
        >
          {formatMessage({ id: 'gloabal.tips.goToLogin' })}
        </Button>
      }
    />
  )
}

export default PrivateRoute
