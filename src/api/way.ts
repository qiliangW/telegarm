import request from '@/utils/http';

export const getWorkerList = (params: any) => {
  return request.get('/worker/getWorkerList', params);
};

export const updateWork = (params: any) => {
  return request.put('/worker/updateWorker', params);
};
export const addWork = (params: any) => {
  return request.post('/worker/createWorker', params);
};
