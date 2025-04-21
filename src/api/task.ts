import request from '@/utils/http';
// 获取任务列表
export function getTaskList(params: any) {
  return request.get('/app/task/list', params);
}
//签到列表

export function getSignList(params: any) {
  return request.get('app/sign/map', params);
}
//签到
export function sign(params: any) {
  return request.get('/app/sign/signin', params);
}
// 任务check
export function checkTask(params: any) {
  return request.get('/app/user/task/check', params);
}
// 任务完成
export function finishTask(params: any) {
  return request.get('app/user/task/one/completeTask', params);
}
//授权check
export function checkAuth(params: any) {
  return request.get('/app/user/binding/auth/check', params);
}
//推特授权获取授权url
export function getTwitterAuthUrl(params: any) {
  return request.get('/app/twitter/auth', params);
}
//discord授权获取授权url
export function getDiscordAuthUrl(params: any) {
  return request.get('/app/discord/auth', params);
}
