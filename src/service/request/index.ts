import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HYRequestConfig, HYRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1、从config中取出来的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestinterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //2. 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器：请求成功拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器：响应成功拦截')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.retunCode === '-1001') {
          // console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有实例都有的拦截器：响应失败拦截')

        // 将loading移除
        this.loading?.close()

        // 例子： 判断不同的httpErrorCode 显示不同的错误信息
        if (err.response.status == 404) {
          // console.log('404的错误~!')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2. 判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 2.将showLoading 设置为true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3. 将结果 reslove
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading 设置为true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
