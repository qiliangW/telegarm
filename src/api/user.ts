import request from '@/utils/http';
// 查询用户token
export function queryToken(params = {}) {
  return request.get('/app/token/getToken', params);
}
//获取edenToken
export function getEdenToken(params = {}) {
  return request.get('/app/token/getToken', params);
}
export function getUserInfo(params = {}) {
  return request.get('/user/getUserInfo', params);
}
export const changeEmail = (params: any) => {
  return request.post('/stress/changeEmail', params);
};
export const updatePayAddress = (params: any) => {
  return request.post('/stress/updateTrcAddress', params);
};
