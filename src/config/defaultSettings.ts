import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'dark',
  // 拂晓蓝 dark
  primaryColor: '#1890ff',
  layout: 'mix', // side , top
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'vite-react-admin项目管理',
  pwa: false,
  iconfontUrl: ''
}

export default Settings
