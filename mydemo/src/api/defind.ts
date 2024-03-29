/**定义返回状态码 */
export enum RequestEnums {
  /**超时时间 */
  TIMEOUT = 3000,
  SUCCESS = 200, // 请求成功
  CREATE = 201, // 创建成功
  DELETED = 204, // 删除成功
  BADREQUEST = 400, // 请求的地址不存在或者包含不支持的参数
  UNAUTHORIZED = 401, // 未授权
  NOTFOUND = 404, // 请求的资源不存在
  UNPROSE = 422, // 验证错误
  ERROR = 500 // 内部错误
}
// 数据返回的接口
/**定义接口数据返回值 */
/**去了公司中看一下公司接口文档的返回类型修改 */
/**
 * 实际需求: {
 *   data: {
 *    },
 * msg: '',
 * code: 0
 *
 *  }
 */
interface Result {
  meta: {
    status: number
    msg: string
  }
}

export interface Relu {
  username: string
  password: string
  uuid: string
  code: string
}

export interface Vpn {
  meta: {
    icon: string
    noCache: boolean
    title: string
  }
  path: string
}
export interface UserCe {
  page: number
  size: number
  enabled: boolean
}
export interface UserIndex {
  page: number
  size: number
  blurry: string
  enabled: boolean
  createTime: never[]
  deptId: number
}
export interface Gang {
  page: number
  size: number
  sort?: string
}
export interface You extends Gang{
	dictName:string
}
/**加上data */
/**根据公司实际情况去修改 */
export interface ResultData<T> extends Result {
  [x: string]: any
  data: T
}
