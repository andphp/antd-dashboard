import Storage, { createStorage } from './Storage'

export const Logged = () => {
  return Storage.get('accessToken') !== null ?? false
}

export const IsTopLevelMenu = () => {
  const menuList = getMenuListState()
  const currentMenu = menuList.filter((menu) => (
    menu.path.toLowerCase() === location.pathname && menu?.children?.length
  ))
  return currentMenu.length > 0
}
