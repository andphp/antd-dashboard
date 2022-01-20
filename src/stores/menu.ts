import { MenuDataItem } from '@ant-design/pro-layout'
import { atom, useRecoilValue, RecoilValue, useRecoilState, RecoilState } from 'recoil'

export const menuListState = atom({
  key: 'menuListState',
  default: []
})

export const setMenuState = (path: string, data: never[] | ((currVal: never[]) => never[])) => {
  console.log('path======', path)
  console.log('path======', data)
  const menuState = atom({
    key: path,
    default: []
  })
  const [_, setStateMenu] = useRecoilState(menuState)
  setStateMenu(data)
}

export const getMenuState = (path: RecoilValue<unknown>) => {
  return useRecoilValue(path)
}
