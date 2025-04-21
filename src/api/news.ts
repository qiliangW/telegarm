import request from '@/utils/http';

export function getNewsList(params: any) {
  return request.get('/news/getNewsList', params);
}
