import request from '@/utils/http';

// 协议列表
export const getProtocolList = (params: any) => {
  return request.get('/protocol/getProtocolList', params);
};
