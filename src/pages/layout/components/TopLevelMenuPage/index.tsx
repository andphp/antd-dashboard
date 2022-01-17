import { useGetCurrentMenus } from '@/api'
import { Divider, Row } from 'antd'
import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import SelectMenuCard from './SelectMenuCard'
const TopLevelMenuPage: React.FC = () => {
  const location = useLocation()
  const { data: menuList, error } = useGetCurrentMenus()
  const loopMenuItem = () => {
    if (!menuList) return []
    const currentMenu = menuList.filter((menu) => (
      menu.path.toLowerCase() === location.pathname && menu?.children?.length
    ))
    return currentMenu[0].children ?? []
  }
  return (
    <div>
      {
        loopMenuItem().map((menuItem) => {
          console.log('menuItem', menuItem)
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
      }
    </div>
  )
}

export default TopLevelMenuPage
