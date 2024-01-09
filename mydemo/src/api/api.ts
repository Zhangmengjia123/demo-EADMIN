import http from '@/utils/httprequest'
import { Relu, UserCe, UserIndex, Gang, You } from '@/api/defind'
// 验证码
export const CodeApi = () => http.get('auth/code')
// 登录
export const LoginApi = (params: Relu) => http.post('auth/login', params)
//侧边栏
export const CeApi = () => http.get('api/menus/build')
// 服务监控
export const FuWu = () => http.get('api/monitor?')

// 用户管理
// 左侧树一级菜单
export const queryTree = () => http.get('api/dept?sort=id,desc')
// // 左侧二级菜单
export const queryErtree = (id: number) =>
  http.get(`api/dept?sort=id,desc&pid=${id}`)
// 搜索左侧
export const querysearchdata = (name: string) =>
  http.get(`api/dept?sort=id,desc&name=${name}`)
// 获取搜索区域的状态
export const queryuserstatus = () =>
  http.get('api/dictDetail?dictName=user_status&page=0&size=9999')
// // 搜索右侧表格
export const querynametable = (paramsn: UserIndex) =>
  http.get('api/users' + '?', paramsn)
// // 获取岗位
export const queryvolume = (params: UserCe) => http.get('api/job', params)
//获取角色
export const queryroles = () => http.get('api/roles/all')
//删除角色
export const querydel = () => http.delete('api/users')

// 角色
// 角色列表
export const getTable = (params: {
  page: number
  size: number
  sort: string
}) => http.get('api/roles', { params })
// 角色子菜单
export const RlueZi = (pid: number) => http.get(`api/menus/lazy?pid=${pid}`)
// 菜单分配
export const getMenu = (pid: number) => http.get('api/menus/lazy?pid=' + pid)

// 菜单管理
export const CaiIndex = (params: {
  page: number
  size: number
  sort: string
}) => http.get('api/menus?page=0&size=10&sort=id%2Cdesc', params)
// 子元素
export const CaiChil = (id: number) => http.get(`api/menus?pid=${id}`)

export const wa = (params: any) => http.put('api/jobs', params)

//  部门管理
export const Bumen = (params: Gang) =>
  http.get(`api/dept?page=${params.page}&size=${params.size}}&sort=id%2Cdesc`)
// 子数据
export const Zimen = (pid: number) => http.get(`api/dept?pid=${pid}`)
// 岗位管理
export const gangIndex = (params: Gang) =>
  http.get(
    `api/job?page=${params.page}&size=${params.size}&sort=jobSort%2Casc&sort=id%2Cdesc`
  )

// 字典管理
export const ZiIndex = (params: Gang) =>
  http.get(`api/dict?page=${params.page}&size=${params.size}&sort=id%2Cdesc`)
// 右侧字典
export const YouIndex = (params: You) =>
  http.get(
    `api/dictDetail?page=${params.page}&size=${params.size}&sort=dictSort%2Casc&sort=id%2Cdesc&dictName=${params.dictName}`
  )

// 任务调度
export const RenIndex = (params: Gang) =>
  http.get(`api/jobs?page=${params.page}&size=${params.size}&sort=id%2Cdesc`)
/////////////////////////////

export interface listI {
  beanName: string
  createBy: string
  createTime: string
  cronExpression: string
  description: string
  email: ''
  id: string
  isPause: boolean
  jobName: string
  methodName: string
  params: null
  pauseAfterFailure: boolean
  personInCharge: string
  subTask: null
  updateBy: string
  updateTime: string
}
// 获取任务调度表格数据
export const listApi = (data: listI) =>
  //@ts-ignore

  http.get(`api/jobs?page=${data.page}&size=${data.size}&sort=${data.id}%2Cdesc`, { data })
// 编辑接口
export interface editI {
  beanName: string
  createBy: string
  createTime: string
  cronExpression: string
  description: string
  email: string
  id: string
  isPause: boolean
  jobName: string
  methodName: string
  params: null
  pauseAfterFailure: boolean
  personInCharge: string
  subTask: null
  updateBy: string
  updateTime: string
}
export const editApi = (datas: editI) => http.put('api/jobs', datas)

//搜索
// export const searchApi=()=>http.get(`jobs?page=0&size=10&sort=id%2Cdesc&jobName=%E4%BB%BB%E5%8A%A1`)

export const searchApi = (data: listI) =>

 //@ts-ignore

  http.get(`api/jobs?page=${data.page}&size=${data.size}&sort=${data.id}%2Cdesc&jobName=${data.jobName}`, {
    data
  })
//用户 数据
export interface userI {
  avatarPath: string
  createBy: string
  createTime: string
  dept: {
    id: string
    name: string
  }
  email: string
  enabled: boolean
  gender: string
  id: string
  jobs: [
    {
      id: string
      name: string
    }
  ]
  nickName: string
  phone: string
  roles: [
    {
      dataScope: string
      id: string
      level: string
      name: string
    }
  ]
  updateBy: string
  updateTime: string
  username: string
}
 //@ts-ignore

export const userList = (data: userI) =>  http.get(`api/users?page=${data.page}&size=${data.size}&sort=${data.id}%2Cdesc`, { data })
