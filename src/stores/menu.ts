import { createStorage } from '@/utils/Storage'
import { MenuDataItem } from '@ant-design/pro-layout'
import { atom, useRecoilValue, RecoilValue, useRecoilState, RecoilState } from 'recoil'

export const menuListState = atom({
  key: 'menuListState',
  default: []
})

export const MenuListState = createStorage({ prefixKey: 'menuListState', storage: sessionStorage })

export const setMenuListState = (path: string, data: any) => {
  return MenuListState.set(path, data)
}

export const getMenuListState = (path: string) => {
  return MenuListState.get(path)
}
