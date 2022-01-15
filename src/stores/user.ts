import { atom, selector } from 'recoil'

import { LoginParams, Role } from '@/models/login'
import { Locale, User } from '@/models/user'
import { getGlobalState } from '@/models'

const initialState: User = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! || (navigator.languages?.[0]) || navigator.language || 'en-us') as Locale,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
  logged: false,
  menuList: [],
  username: localStorage.getItem('username') || '游客',
  role: (localStorage.getItem('role') || 'guest') as Role,
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
}

export const userState = atom({
  key: 'userState',
  default: initialState
})
