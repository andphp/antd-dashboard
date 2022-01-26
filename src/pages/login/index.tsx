import React, { FC, useState } from 'react'
import { Button, Checkbox, Form, Input, Card, Row, Col } from 'antd'
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
import { useLocale } from '@/locales'
import SelectLang from '../layout/components/GlobalHeaderRight/SelectLang'
import Storage from '@/utils/Storage'
const initialValues: LoginParams = {
  username: 'guest',
  password: '1232344',
  remember: true
}

const LoginForm: FC = () => {
  const loginMutation = useLogin()
  const navigate = useNavigate()
  const location = useLocation() as Location<{ from: string }>
  const { formatMessage } = useLocale()
  // const dispatch = useAppDispatch();

  const onFinished = async(form: LoginParams) => {
    const result = await loginMutation.mutateAsync(form)
    console.log('result: ', result)

    if (result) {
      // localStorage.setItem('token', result.accessToken)
      Storage.set('accessToken', result.accessToken, 60 * 60 * 24 * 2)
      const from = location.state?.from || { pathname: '/dashboard' }
      navigate(from)
    }
  }

  const [isSign, setIsSign] = useState(true)
  const titleFormatMessageId = isSign ? 'login.title' : 'register.title'

  const changeBtn = () => setIsSign(!isSign)
  return (
    <div className={`${styles.container} ${isSign ? '' : styles.signUpMode}`}>
      <div className={styles.formsContainer}>
        <div className={styles.signinSignup}>
          <div className={styles.signin}>
            <SelectLang className={styles.action} />
            <Card
              title={formatMessage({ id: titleFormatMessageId })}
              bordered
              hoverable
              className={ styles.aCard}
              headStyle={{ textAlign: 'center', fontSize: '24px', color: '#1890ff' }}
              loading={ !isSign}
            >
              <Form<LoginParams>
                className={styles.signInForm}
                style={{ padding: ' 50px 50px' }}
                onFinish={onFinished}
                initialValues={initialValues}>
                <Form.Item
                  name='username'
                  rules={[{ required: true, message: formatMessage({ id: 'login.form.username.rule.required.message' }) }]}
                >
                  <Input className={styles.antInput} size='large' autoComplete='on' placeholder={formatMessage({ id: 'login.form.username' })} prefix={ <UserOutlined style={{ color: '#1890ff' }} />} />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    { required: true, message: formatMessage({ id: 'login.form.password.rule.required.message' }) },
                    { min: 6, message: formatMessage({ id: 'login.form.password.rule.min.message' }) },
                    { max: 20, message: formatMessage({ id: 'login.form.password.rule.max.message' }) }
                  ]}
                >
                  <Input className={styles.antInput} type='password' size='large' autoComplete='on' placeholder={formatMessage({ id: 'login.form.password' })} prefix={<LockOutlined style={{ color: '#1890ff' }} />} />
                </Form.Item>
                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>{ formatMessage({ id: 'login.form.remember.checkbox' })}</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    size='large'
                    className={styles.loginButton}
                    htmlType='submit'
                    type='primary'
                    block
                  >
                    { formatMessage({ id: titleFormatMessageId })}
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
            <p>{formatMessage({ id: 'login.slogan' })}</p>
            <Button shape='round' onClick={changeBtn}>{formatMessage({ id: 'register.title' })}</Button>
          </div>
          <img className={styles.image} src={loginPng}></img>
        </div>
        <div className={`${styles.panel} ${styles.rightPanel}`}>
          <div className={styles.content}>
            <h1>Admin-React-Antd</h1>
            <p>{formatMessage({ id: 'register.slogan' })}</p>
            <Button shape='round' onClick={changeBtn}>{formatMessage({ id: 'login.title' })}</Button>
          </div>
          <img className={styles.image} src={registerPng}></img>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
