import request from '@/utils/http';

// 获取能量
export function getEnergy(params: any) {
  return request.get('/app/pond/receive/pond', params);
}
// 获取能量池能量
export function getEnergyPool(params: any) {
  return request.get('/app/pond/pond', params);
}
// 获取用户能量
export function getUserEnergy(params: any) {
  return request.get('/app/point/getPoint', params);
}
