import { ApiResult } from '.'

/** user's role */
export type Role = 'guest' | 'admin'

export interface LoginParams {
  /** 用户名 */
  username: string
  /** 用户密码 */
  password: string
}

export interface LoginResult {
  /** auth token */
  accessToken: string
  expireToken: number
}

export interface LogoutParams {
  token: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LogoutResult {}
