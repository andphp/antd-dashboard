import React, { FC, useState } from 'react'
import { Button, Checkbox, Form, Input, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
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
            <Card
              title={`${isSign ? '登录' : '注册'}`}
              bordered
              hoverable
              className={ styles.aCard}
              headStyle={{ textAlign: 'center', fontSize: '24px', color: '#1890ff' }}
              loading={ !isSign}
            >
              <Form<LoginParams>
                className={styles.signInForm}
                style={{ padding: ' 50px 50px' }}
                onFinish={onFinished} initialValues={initialValues}>
                <Form.Item
                  name='username'
                  rules={[{ required: true, message: '请输入用户名！' }]}
                >
                  <Input className={ styles.antInput} size='large' autoComplete='on' placeholder='用户名' prefix={ <UserOutlined style={{ color: '#1890ff' }} />} />

                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[{ required: true, message: '请输入密码！' }]}
                ><div style={{ borderRadius: '8px 8px' }}>
                    <Input className={ styles.antInput} type='password' size='large' autoComplete='on' placeholder='密码' prefix={<LockOutlined style={{ color: '#1890ff' }} />} />

                  </div>
                </Form.Item>
                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>记住用户</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    size='large'
                    className={styles.loginButton}
                    htmlType='submit'
                    type='primary'
                    block
                  >
              登录
                  </Button>
                </Form.Item>

              </Form>
            </Card>
          </div>
        </div>
      </div>
      <div className={styles.panelsContainer}>
        <div className={`${styles.panel} ${styles.leftPanel}`}>
          <div className={styles.content}>
            <h1>Admin-React-Antd</h1>
            <p>全新技术栈(React\Recoil\React Query\React Hooks\Vite)的后台管理系统</p>
            <Button onClick={changeBtn}>注册</Button>
          </div>
          <img className={styles.image} src={loginPng}></img>
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h1>Admin-React-Antd</h1>
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
