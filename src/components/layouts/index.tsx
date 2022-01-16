import React, { FC, ReactNode } from 'react'
import { RouteProps } from 'react-router-dom'
export interface LayoutPageProps extends RouteProps {
  render: FC<ReactNode>;
}
const LayoutPage: FC<LayoutPageProps> = ({ render, ...props }) => {
  return render({ ...props })
}

export default LayoutPage
