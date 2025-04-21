import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
//import { parse, stringify } from 'qs';
//import useCancleRequestStore from '@/stores/request';
import { RequestCodeEnum } from '@/enums/requestEnums';
import useStore from '@/strore';
//import { useLaunchParams } from '@telegram-apps/sdk-react';
import JSEncrypt from 'jsencrypt';
import { publicKey } from '@/utils/index';
const encryptor = new JSEncrypt(); // 创建加密对象实例
encryptor.setPublicKey(publicKey);
//console.log(useLaunchParams, 'publicKey');
//const lp = useLaunchParams();
export interface ResponseData<T> {
  code?: number;
  data?: T;
  msg?: string;
}
export const showMessage = (status: number | string): string => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};
class HttpRequest {
  public baseURL = import.meta.env.VITE_APP_BASE_API || '';

  public timeout = 20000;
  public request(options: AxiosRequestConfig) {
    //console.log(this.baseURL, 'this.baseURL');
    const instance = axios.create({
      // paramsSerializer: {
      //   encode: parse,
      //   serialize: (params) => stringify(params, { indices: false }),
      // },
    });
    options = this.mergeOptions(options);
    this.setInterceptors(instance);
    return instance(options);
  }
  setInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        const token = useStore.getState().token;
        // const token = useStore((state: any) => state.token);
        if (token) config.headers['x-token'] = token;
        //config.headers['terminal'] = 4;

        // config.cancelToken = new axios.CancelToken((cancel) => {
        //   useCancleRequestStore().addCancelRequest(cancel);
        // });
        //    console.log(config, 'config');
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    instance.interceptors.response.use(
      async (response) => {
        const { code, data, msg } = response.data as any;
        if (code === RequestCodeEnum.SUCCESS) {
          return { ...data, message: msg };
        } else {
          return Promise.reject(msg);
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  mergeOptions(options: AxiosRequestConfig) {
    return Object.assign(
      {
        baseURL: this.baseURL,
        timeout: this.timeout,
      },
      options
    );
  }
  refreshToken(initData: any) {
    return this.post('/login/tg', {
      firstName: initData?.user?.firstName,
      lastName: initData?.user?.lastName,
      id: initData?.user?.id,
    }).then((res) => {
      useStore.getState().setToken(res);
    });
  }
  public get<T>(
    url: string,
    data: unknown,
    config: object = {}
  ): Promise<ResponseData<T>> {
    return this.request({
      method: 'get',
      url,
      params: data,
      ...config,
    }).then(
      (res) => Promise.resolve(res?.data ? res.data : res),
      (err) => Promise.reject(err)
    );
  }
  public post<T>(
    url: string,
    data: unknown,
    config: object = {},
    encryption = false
  ): Promise<ResponseData<T>> {
    return this.request({
      method: 'post',
      url,
      data: encryption ? encryptor.encrypt(JSON.stringify(data)) : data,
      ...config,
    }).then(
      (res) => Promise.resolve(res?.data ? res.data : res),
      (err) => Promise.reject(err)
    );
  }

  public delete<T>(
    url: string,
    data: unknown,
    config: object = {}
  ): Promise<ResponseData<T>> {
    return this.request({
      method: 'delete',
      url,
      params: data,
      ...config,
    }).then(
      (res) => Promise.resolve(res.data),
      (err) => Promise.reject(err)
    );
  }
  public put<T>(
    url: string,
    data: unknown,
    config: object = {}
  ): Promise<ResponseData<T>> {
    return this.request({
      method: 'put',
      url,
      data,
      ...config,
    }).then(
      (res) => Promise.resolve(res?.data ? res.data : res),
      (err) => Promise.reject(err)
    );
  }
}

export default new HttpRequest();
