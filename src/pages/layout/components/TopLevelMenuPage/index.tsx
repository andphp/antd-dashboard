import { useGetCurrentMenus } from '@/api'
import { GetMenuListState } from '@/stores/menu'
import { IsTopLevelMenu } from '@/utils/helper'
import { Divider, Row } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { Outlet, RouteProps, useLocation } from 'react-router-dom'
import SelectMenuCard from './SelectMenuCard'
export interface TopLevelMenuPageProps extends RouteProps {
  frompath:string
}
const TopLevelMenuPage: React.FC<TopLevelMenuPageProps> = ({ frompath }) => {
  console.log('toplev----------------------')
  const { data: menuList, error } = useGetCurrentMenus()
  const loopMenuItem = () => {
    console.log('toplevelpage.menuListsaaaaa', menuList)
    if (!menuList) return []
    const currentMenu = menuList.filter((menu) => (
      menu.path.toLowerCase() === frompath && menu?.children?.length
    ))
    return currentMenu[0]?.children ?? []
  }

  console.log('ssssssssssssssssssssssssssssslocation', frompath)

  const topMenuNode = (
    loopMenuItem().map((menuItem) => {
      console.log('toplevelpage.menuItem', menuItem)
      if (menuItem.children?.length) {
        return (
          <Fragment key={ menuItem.path}>
            <Divider orientation='left'>{menuItem.path}</Divider>
            <Row gutter={[24, { xs: 12, sm: 24 }]}>

              {
                menuItem.children.map((menuChildrenItem: { path: React.Key}) => <SelectMenuCard key={menuChildrenItem.path} path={menuChildrenItem.path} />)
              }
            </Row>

          </Fragment>
        )
      }
      return menuItem.path
    })
  )
  // console.log('00000000000000000000000000')

  return (
    <div key='fasttoplevel'>
      {topMenuNode}
    </div>
  )
}

export default TopLevelMenuPage
