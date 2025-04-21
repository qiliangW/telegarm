import request from '@/utils/http';

export const getConfig = () => {
  return request.get('/stress/getConfig', {});
};
