import { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'dark',
  // 拂晓蓝 dark
  primaryColor: '#1890ff',
  layout: 'side', // side , top, mix
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'antd-dashboard',
  pwa: false,
  iconfontUrl: ''
}

export default Settings
