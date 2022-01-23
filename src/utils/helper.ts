import { GetMenuListState } from '@/stores/menu'
import Storage, { createStorage } from './Storage'

export const Logged = () => {
  return Storage.get('accessToken') !== null ?? false
}

export const IsTopLevelMenu = (pathname: string) => {
  const menu = GetMenuListState(pathname)
  if (!menu) return false
  return menu?.level === 1 ?? false
}
