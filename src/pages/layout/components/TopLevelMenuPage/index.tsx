import { useGetCurrentMenus } from '@/api'
import { IsTopLevelMenu } from '@/utils/helper'
import { Divider, Row } from 'antd'
import React, { Fragment } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SelectMenuCard from './SelectMenuCard'
const TopLevelMenuPage: React.FC = (props) => {
  console.log('toplev----------------------')
  const location = useLocation()
  const { data: menuList, error } = useGetCurrentMenus()
  const loopMenuItem = () => {
    console.log('toplevelpage.menuListsaaaaa', menuList)
    if (!menuList) return []
    const currentMenu = menuList.filter((menu) => (
      menu.path.toLowerCase() === location.pathname && menu?.children?.length
    ))
    return currentMenu[0]?.children ?? []
  }

  const topMenuNode = (
    loopMenuItem().map((menuItem) => {
      console.log('toplevelpage.menuItem', menuItem)
      if (menuItem.children?.length) {
        return (
          <Fragment key={ menuItem.path}>
            <Divider orientation='left'>{menuItem.path}</Divider>
            <Row gutter={[24, { xs: 12, sm: 24 }]}>

              {
                menuItem.children.map((menuChildrenItem) => <SelectMenuCard key={ menuChildrenItem.path} path={menuChildrenItem.path} />)
              }
            </Row>

          </Fragment>
        )
      }
      return menuItem.path
    })
  )
  console.log('00000000000000000000000000')
  const resultNode = IsTopLevelMenu(location.pathname) ? topMenuNode : props.children
  return (
    <div>
      {resultNode}
    </div>
  )
}

export default TopLevelMenuPage
