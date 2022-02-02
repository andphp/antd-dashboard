import React from 'react'
import { Menu } from 'antd'
import classes from './index.module.less'
import { localeConfig } from '@/config/locale'
import { useLocale } from '@/locales'
import { useRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import HeaderDropdown from '../HeaderDropdown'
import Icon from '@/components/icon'

interface SelectLangProps {
  className?: string;
}

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const { ...restProps } = props

  const { formatMessage } = useLocale()
  const [user, setUser] = useRecoilState(userState)

  const { locale, settings } = user
  let className = ''

  const selectLocale = ({ key }: { key: any }) => {
    setUser({ ...user, locale: key })
    localStorage.setItem('locale', key)
  }

  if (
    (settings.navTheme === 'dark' && settings.layout === 'top') ||
    settings.layout === 'mix'
  ) {
    className = `dark`
  }

  const langList = () => {
    return (
      <Menu onClick={selectLocale}>
        {localeConfig.map((lang) => {
          return (
            <Menu.Item
              style={{ textAlign: 'left' }}
              disabled={locale.toLowerCase() === lang.key}
              key={lang.key}
            >
              {lang.icon} {lang.name}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
  return (
    <HeaderDropdown
      placement='bottomRight'
      className={classes.action}
      overlay={langList}
    >
      <span id='language-change' className={classes.lang}>
        <Icon
          size='normal'
          type={`icon-translate`}

        />
      </span>
    </HeaderDropdown>
  )
}

export default SelectLang
