import request from '@/utils/http';

export const getpingData = (execNum: any) => {
  return request.get('/pingData/getPingDataList', {
    page: 1,
    pageSize: 1000,
    execNum,
  });
};
