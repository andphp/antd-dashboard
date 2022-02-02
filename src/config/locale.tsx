import React from 'react'

import enUS from '@/locales/en-us'
import zhCN from '@/locales/zh-cn'

export const localeConfig = [
  {
    name: 'English',
    key: 'en-us',
    messages: enUS,
    icon: <>English</>
  },
  {
    name: '简体中文',
    key: 'zh-cn',
    messages: zhCN,
    icon: <>简体中文</>
  }
]
