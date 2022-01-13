import { Tag, Space, Menu, Button } from 'antd'
import { QuestionCircleOutlined, ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

import Avatar from './AvatarDropdown'
import HeaderDropdown from '../HeaderDropdown'
import HeaderSearch from '../HeaderSearch'
// import "./index.less";
import classes from './index.module.less'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/user'
import SelectLang from './SelectLang'
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg'
import screenfull from 'screenfull'

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068'
}

const GlobalHeaderRight: React.FC = () => {
  const user = useRecoilValue(userState)

  const { settings } = user
  let className = classes.right

  if (
    (settings.navTheme === 'dark' && settings.layout === 'top') ||
    settings.layout === 'mix'
  ) {
    className = `${classes.right} ${classes.dark}`
  }
  const [screeIcon, setScreeIcon] = useState(<ArrowsAltOutlined/>)
  screenfull.onchange(() => {
    if (screenfull.isFullscreen && screeIcon !== <ShrinkOutlined/>) {
      setScreeIcon(<ShrinkOutlined/>)
    } else {
      setScreeIcon(<ArrowsAltOutlined/>)
    }
  })
  const screenfullToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${classes.action} ${classes.search}`}
        placeholder='菜单搜索'
        defaultValue='个人中心'
        options={[
          {
            label: <a href='next.ant.design'>Ant Design</a>,
            value: 'Ant Design'
          },
          {
            label: <a href='/'>个人中心</a>,
            value: '个人中心'
          },
          {
            label: <a href='https://prolayout.ant.design/'>Pro Layout</a>,
            value: 'Pro Layout'
          }
        ]}
        onSearch={value => {
          console.log('input', value)
        }}
      />
      <HeaderDropdown
        className={classes.action}

        overlay={
          <Menu>
            <Menu.Item key='wendang1'
              onClick={() => {
                window.open('/~docs')
              }}
            >
              文档
            </Menu.Item>
            <Menu.Item key='wendang2'
              onClick={() => {
                window.open('https://pro.ant.design/docs/getting-started')
              }}
            >
              Ant Design Pro 文档
            </Menu.Item>
          </Menu>
        }
      >

        <span>
          <QuestionCircleOutlined />
        </span>
      </HeaderDropdown>
      <Avatar />
      <Button type='link' icon={screeIcon} onClick={screenfullToggle}/>
      <SelectLang className={classes.action} />
      {console.log('inpu森t')}
    </Space>
  )
}
export default GlobalHeaderRight
