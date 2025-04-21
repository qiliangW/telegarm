import request from '@/utils/http';
// 开始游戏
export function handleStartGame(params: any) {
  return request.get('/app/play/game/start', params);
}
// 结束游戏
export function endGame(params: any) {
  return request.get('/app/play/game/end', params);
}
//检查游戏是否超过15秒
export function checkGameTime(params: any) {
  return request.get('/app/play/game/checkAlive', params);
}
//结束游戏加密
export function endGameEncryption(params: any) {
  return request.post('/app/play/game/end/encrypt', params, {}, true);
}
