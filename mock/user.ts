import { MockMethod } from 'vite-plugin-mock'

const mockMenuList = [
  {
    path: '/dashboard',
    name: '面板',
    locale: 'menu.dashboard',
    icon: 'heart'
  },
  // {
  //   path: '/permission',
  //   name: 'permission',
  //   locale: 'menu.permission',
  //   icon: 'smile',
  //   children: [
  //     {
  //       path: '/permission/list',
  //       name: 'permission list',
  //       locale: 'menu.permission.list',
  //       icon: 'smile'
  //     }
  //   ]
  // },
  {
    path: '/system',
    name: 'systemManagement',
    locale: 'menu.system',
    icon: 'smile',
    children: [
      {
        path: '/system/authority',
        name: 'authority',
        locale: 'menu.system.authority',
        icon: 'smile',
        children: [
          {
            path: '/system/authority/interface',
            name: 'interfaceManagement',
            locale: 'menu.system.authority.interface',
            icon: 'smile'
          },
          {
            path: '/system/authority/menu',
            name: 'menuManagement',
            locale: 'menu.system.authority.menu',
            icon: 'smile'
          }
        ]
      }
    ]
  },
  {
    path: '/order',
    name: 'orderManage',
    locale: 'menu.order',
    icon: 'smile',
    children: [
      {
        path: 'domestic',
        name: 'domestic',
        locale: 'menu.order.domestic',
        icon: 'smile'
      },
      {
        path: 'international',
        name: 'international',
        locale: 'menu.order.international',
        icon: 'smile'
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    locale: 'menu.notfound',
    icon: 'frown'
  }
]

const mockNoticeList = [
  {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: 'notification'
  },
  {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: 'notification'
  },
  {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: 'notification'
  },
  {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: 'notification'
  },
  {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: 'notification'
  },
  {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: 'event'
  },
  {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: 'event'
  },
  {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: 'event'
  },
  {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: 'event'
  }
]

export default [
  {
    url: '/api/v1/login',
    method: 'POST',
    response: () => {
      return {
        code: 0,
        data: {
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkZWZhdWx0XzYxZTgxZDc5YWFhYzQzLjQyNTkwNzc3IiwiaWF0IjoxNjQyNjAxODQ5LCJuYmYiOjE2NDI2MDE4NDksImV4cCI6MTY0MjY4ODI0OSwiaWQiOjEsImVtYWlsIjoiMjkxODQ2MTUzQHFxLmNvbSIsInBob25lIjoiMTgyMDI4MjE5MTYiLCJ1c2VybmFtZSI6ImFkbWluIiwibmlja25hbWUiOiIiLCJkZXBhcnRtZW50X2lkIjowLCJyZWFsbmFtZSI6Ilx1OGQ4NVx1N2VhN1x1N2JhMVx1NzQwNlx1NTQ1OCIsInBhc3N3b3JkIjoiJDJ5JDEwJFFJVmdHdnVST013U3ZNei5IXC9GaUhlbk8yZzNOZDFBUFwvbW9YcXY3YjN1OXA1MTg5cHF4NVciLCJhdmF0YXIiOiIiLCJsYXN0X2xvZ2luX2F0IjoiMjAyMi0wMS0xOSAyMjoxNzoyOSIsInN0YXR1cyI6MSwibGFzdF9pcCI6IjEwLjQyLjMuMjQ2IiwidXBkYXRlZF9hdCI6IjIwMjItMDEtMTkgMjI6MTc6MjkiLCJyb2xlX2lkcyI6W10sInJvbGVfbmFtZSI6W10sImRlcGFydG1lbnRfbmFtZSI6IiIsImp3dF9zY2VuZSI6ImRlZmF1bHQifQ.sTSCEyRBQ94D1Ewm0iI8Hsq0XbFhHLMOMHFXx8dfdyQ',
          expireToken: 86400
        },
        msg: 'successful'
      }
    }
  },
  {
    url: '/api/v1/current/user',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          username: '超级管理员',
          realname: '',
          avatar: '',
          departmentId: 0,
          departmentName: '',
          roleId: '',
          role: 'admin',
          phone: '182****1916',
          email: '29****153@qq.com'
        },
        msg: 'successful'
      }
    }
  },
  {
    url: '/api/v1/current/menu',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 0,
        msg: 'successful',
        data: mockMenuList
      }
    }
  },
  {
    url: '/api/v1/current/notice',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 0,
        msg: 'successful',
        data: mockNoticeList
      }
    }
  }
] as MockMethod[]
