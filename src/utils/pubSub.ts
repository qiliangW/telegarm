// 带参数的订阅发布模式

class PubSub {
  private events: { [key: string]: Function[] } = {};
  subscribe(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event: string, res: any) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((callback) => callback(res));
  }
  // 取消订阅
  unsubscribe(event: string, callback: Function) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }
}
export default new PubSub();
