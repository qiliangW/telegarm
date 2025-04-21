import request from '@/utils/http';

//邀请列表
export function inviteList(params: any) {
  return request.get('/app/inviterecord/inviterecord/list/page/total', params);
}
