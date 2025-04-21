import request from '@/utils/http';

export function getOrderList(params: any) {
  return request.get('/order/getOrderList', params);
}

export function createOrder(params: any) {
  return request.post('/order/createOrder', params);
}

export function deleteOrder(params: any) {
  return request.delete('/order/deleteOrder', params);
}

export function findOrder(params: any) {
  return request.post('/order/findOrder', params);
}
export function updateOrder(params: any) {
  return request.put('/order/updateOrder', params);
}
