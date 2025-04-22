import type { ComponentType, JSX } from 'react';
import { HomeLayout } from '@/Layout/HomeLayout';
import { Login } from '@/pages/Login/index'; //登录页
//import { GuidePage } from '@/pages/Guide/Guide'; //引导页
import { Home } from '@/pages/Home/index'; //首页
import { Orders } from '@/pages/Orders/index'; //订单页
import { User } from '@/pages/User/index'; //用户页
import { Plan } from '@/pages/Plan/index'; //计划页
import { Execute } from '@/pages/Execute/index'; //执行页
import { Way } from '@/pages/Way';
import { AddWay } from '@/pages/Way/addWay/index';
import { CreateOrder } from '@/pages/Orders/CreateOrder';
import { Provider } from '@/pages/Provider/index';
import Payment from '@/pages/Payment';
import { CreatePlan } from '@/pages/Plan/CreatePlan/index';
import { ChangeEmail } from '@/pages/ChangeEmail/index';
import { Effectiveness } from '@/pages/Efectiveness/index';
interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  children?: Route[];
}

export const customerRoutes: Route[] = [
  // { path: '/', Component: Login }, //开屏页
  { path: '/createOrder', Component: CreateOrder }, //新增订单
  { path: '/createPlan', Component: CreatePlan },
  { path: '/updateEmail', Component: ChangeEmail },
  { path: '/effectiveness', Component: Effectiveness },
  {
    path: '/',
    Component: HomeLayout,
    children: [
      { path: '', Component: Home, title: 'home' },
      { path: 'orders', Component: Orders, title: 'orders' },
      { path: 'user', Component: User, title: 'user' },
      { path: 'plan', Component: Plan, title: 'plan' },
    ],
  },
];

export const provideRoutes: Route[] = [
  { path: '/', Component: Login }, //开屏页
  { path: '/addway', Component: AddWay }, //新增方式
  { path: '/updateEmail', Component: ChangeEmail },
  { path: '/payment', Component: Payment },
  { path: '/effectiveness', Component: Effectiveness },
  {
    path: '/home',
    Component: HomeLayout,
    children: [
      { path: '', Component: Home, title: 'home' },
      { path: 'user', Component: Provider, title: 'user' },
      { path: 'way', Component: Way, title: 'way' },
      { path: 'execute', Component: Execute, title: 'execute' },
    ],
  },
];
