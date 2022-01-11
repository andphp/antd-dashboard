import React, { FC, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { LoginParams } from '@/models/login'
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from 'history'
import { useLogin } from '@/api'

import styles from './index.module.less'
import registerPng from '@/assets/login/register.png'
import loginPng from '@/assets/login/login.png'
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg'

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest'
  // remember: true
}

const LoginForm: FC = () => {
  const loginMutation = useLogin()
  const navigate = useNavigate()
  const location = useLocation() as Location<{ from: string }>

  // const dispatch = useAppDispatch();

  const onFinished = async(form: LoginParams) => {
    const result = await loginMutation.mutateAsync(form)
    console.log('result: ', result)

    if (result) {
      localStorage.setItem('token', result.token)
      localStorage.setItem('username', result.username)

      const from = location.state?.from || { pathname: '/dashboard' }
      navigate(from)
    }
  }

  const [isSign, setIsSign] = useState(true)

  const changeBtn = () => setIsSign(!isSign)
  return (
    <div className={`${styles.container} ${isSign ? '' : styles.signUpMode}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <div className={styles.signin}>
            sdf
          </div>
        </div>
      </div>
      <div className={styles.panelsContainer}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={styles.content}>
            <h1>Admin-Vue3-Antd</h1>
            <p>牛逼plus 江北区最具影响力的 Web 后台管理系统</p>
            <Button onClick={changeBtn}>注册</Button>
          </div>
          <img className={styles.image} src={loginPng}></img>
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h1>Admin-Vue3-Antd</h1>
            <p>牛逼plus 江北区最具影响力的 Web 后台管理系统</p>
            <Button onClick={changeBtn}>登录</Button>
          </div>
          <img className={styles.image} src={registerPng}></img>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
