import request from '@/utils/http';

export const getExecuteList = (params: any) => {
  return request.get('/execute/getExecuteList', params);
};
