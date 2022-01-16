import { useGetCurrentMenus } from '@/api'
import React from 'react'
import { useLocation } from 'react-router-dom'
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
          return menuItem.path
        })
      }
    </div>
  )
}

export default TopLevelMenuPage
