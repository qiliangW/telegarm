import request from '@/utils/http';
export function login(params: any) {
  return request.post('/login/tg', params);
}
// getInfo
export function getInfo(params: any) {
  return request.get('/getInfo', params);
}
// 获取理疗师列表
export function getTherapistList(params?: any) {
  return request.get('/app/healer/list', params);
}
// 解锁理疗师
export function unlockHealer(params: any) {
  return request.get('/app/user/healer/unlock', params);
}
//用户方登录
export function userLogin(params: any) {
  return request.post('/stresser/login', params);
}
export function providerLogin(params: any) {
  return request.post('/stress/loginProvider', params);
}
export function sendCode(params: any) {
  return request.post('/stress/sendCode', params);
}
