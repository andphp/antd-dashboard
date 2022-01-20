import { MenuDataItem } from '@ant-design/pro-layout'
import { atom, useRecoilValue, RecoilValue, useRecoilState, RecoilState } from 'recoil'

export const menuListState = atom({
  key: 'menuListState',
  default: []
})

export const setMenuState = (path: string, data: any) => {
  console.log('path======', path)
  console.log('path======', data)
  const menuState = atom({
    key: path,
    default: null
  })
  const [_, setStateMenu] = useRecoilState(menuState)
  setStateMenu(data)
}

export const getMenuState = (path: string) => {
  const menuState = atom({
    key: path,
    default: null
  })
  return useRecoilValue(menuState)
}
