import React, { FC, Fragment, useEffect, useState } from 'react'
import nProgress from 'nprogress'
import { Route, RouteProps } from 'react-router-dom'
export type NProgressWithProps = RouteProps
const NProgressWithNode: FC<NProgressWithProps> = ({ element, path }) => {
  useState(nProgress.start())
  useEffect(() => {
    nProgress.done()
    return () => nProgress.start()
  })
  return <Fragment key={ path}>
    { element}
  </Fragment>
}

export default NProgressWithNode
