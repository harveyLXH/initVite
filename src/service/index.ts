// service 统一出口
import HYRequest from './request'
import { TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

const BASE_URL = process.env.VITE_APP_BASE_API

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        if (config && config?.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestinterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (config) => {
      // console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default hyRequest
