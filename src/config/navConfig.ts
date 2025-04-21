// navConfig.ts

import homeTabIconPath from '@/assets/imgs/home-tab-icon.png';
import homeTabActivePath from '@/assets/imgs/home-tab-active-icon.png';
import orderTabIconPath from '@/assets/imgs/order-tab-icon.png';
import orderTabActivePath from '@/assets/imgs/order-tab-active-icon.png';
import planTabIcon from '@/assets/imgs/plan-tab-icon.png';
import palnTabActiveIcon from '@/assets/imgs/plan-tab-active-icon.png';
import userTabIcon from '@/assets/imgs/user-tab-iocn.png';
import userTabActive from '@/assets/imgs/user-tab-active-icon.png';
import wayTabActiveIcon from '@/assets/imgs/way-active-icon.png';
import wayTabIcon from '@/assets/imgs/way-icon.png';
import executeTabIcon from '@/assets/imgs/execute-tab-icon.png';
import executeTabActiveIcon from '@/assets/imgs/execute-tab-active.png';
export const navConfigForCustom = [
  {
    name: '/home',
    label: '首页',
    renderIcon: (active: boolean) =>
      active ? homeTabActivePath : homeTabIconPath,
  },
  {
    name: '/home/orders',
    label: '订单',
    renderIcon: (active: boolean) =>
      active ? orderTabActivePath : orderTabIconPath,
  },
  {
    name: '/home/plan',
    label: '我的计划',
    renderIcon: (active: boolean) => (active ? palnTabActiveIcon : planTabIcon),
  },
  {
    name: '/home/user',
    label: '我的',
    renderIcon: (active: boolean) => (active ? userTabActive : userTabIcon),
  },
];

export const navConfigForProvider = [
  {
    name: '/home',
    label: '首页',
    renderIcon: (active: boolean) =>
      active ? homeTabActivePath : homeTabIconPath,
  },
  {
    name: '/home/way',
    label: '我的方式',
    renderIcon: (active: boolean) => (active ? wayTabActiveIcon : wayTabIcon),
  },
  {
    name: '/home/execute',
    label: '我的执行',
    renderIcon: (active: boolean) =>
      active ? executeTabActiveIcon : executeTabIcon,
  },
  {
    name: '/home/user',
    label: '我的',
    renderIcon: (active: boolean) => (active ? userTabActive : userTabIcon),
  },
];
