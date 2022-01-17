import { useGetCurrentMenus } from '@/api'
import { Divider, Row } from 'antd'
import React from 'react'
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
              <>
                <Divider orientation='left'>{menuItem.path}</Divider>
                <Row gutter={[16, { xs: 8, sm: 16 }]}>

                  {
                    menuItem.children.map((menuChildrenItem) => <SelectMenuCard path={menuChildrenItem.path} />)
                  }
                </Row>

              </>
            )
          }
          return menuItem.path
        })
      }
    </div>
  )
}

export default TopLevelMenuPage
