import request from '@/utils/http';

export function getPlanList(params: any) {
  return request.get('/plan/getPlanList', params);
}
export function createPlan(params: any) {
  return request.post('/plan/createPlan', params);
}

export function updatePlan(params: any) {
  return request.put('/plan/updatePlan', params);
}
