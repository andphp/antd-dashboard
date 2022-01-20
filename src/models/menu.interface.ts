interface MenuItem {
  /** menu item name */
  name: string
  /** menu labels */
  label: {
    zh_CN: string
    en_US: string
  }
  /** 图标名称
   *
   * 子子菜单不需要图标
   */
  icon?: string
  /** 菜单id */
  key: string
  /** 菜单路由 */
  path: string
  /** 子菜单 */
  children?: MenuItem[]
  /** 菜单等级*/
  level: number
  /** 是否隐藏 */
  hidden?: boolean
}

export type MenuChild = Omit<MenuItem, 'children'>

export type MenuList = MenuItem[]
