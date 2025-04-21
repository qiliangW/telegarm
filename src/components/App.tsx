import {
  useIntegration,
  useLocation,
} from '@telegram-apps/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  useClosingBehavior,
} from '@telegram-apps/sdk-react';
import axios from 'axios';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Router, Routes, HashRouter } from 'react-router-dom';

import AutoScrollToTop from '@/components/AutoScrollToTop/AutoScrollToTop';
import { login } from '@/api/login';

import { checkTask } from '@/api/task';

import { Toaster, resolveValue, toast } from 'react-hot-toast';
import '@/components/Toast/Toast.scss';

import { provideRoutes, customerRoutes } from '@/navigation/routes';
import useStore from '@/strore';
let ChildrenRoutes = ({ children }: any) => {
  if (!children) return null;
  return children.map((route: any) => {
    return (
      <Route key={route.path} {...route}>
        {ChildrenRoutes(route)}
      </Route>
    );
  });
};

export const App: FC = () => {
  const loginType = useStore((state: any) => state.loginType);
  const setToken = useStore((state: any) => state.setToken);
  const [routes, setRoutes] = useState<any[]>([]);
  const token = useStore((state: any) => state.token);
  const setIsFirstUse = useStore((state: any) => state.setIsFirstUse);
  const closeUser = useClosingBehavior();
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  //console.log('miniApp', miniApp);
  const themeParams = useThemeParams();
  const viewport = useViewport();
  // let getTaskInfo = async () => {
  //   try {
  //     let res = await checkTask({ taskId: 1 });
  //     if (res) {
  //       //新手指导已完成
  //       setIsFirstUse(false);
  //     } else {
  //       setIsFirstUse(true);
  //     }
  //   } catch (e) {}
  // };

  useEffect(() => {
    const { initData, initDataRaw }: any = lp;
    closeUser?.enableConfirmation();
    viewport?.expand();
    const { firstName, lastName, id } = initData?.user;
    let referrerId = null;
    const startParameter = initData.startParam;
    if (startParameter && startParameter.startsWith('referral_')) {
      referrerId = startParameter.split('_')[1];
    }
    // axios
    //   .post(
    //     '/api/login/tg',
    //     { firstName, lastName, id, tgInviter: referrerId },
    //     {
    //       headers: {
    //         Authorization: `tma ${initDataRaw}`,
    //       },
    //     }
    //   )
    //   .then((res: any) => {
    //     setToken(res.data.data);
    //     getTaskInfo();
    //   });
  }, []);
  useEffect(() => {
    // return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    //   return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    //return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  // const [location, reactNavigator] = useIntegration(navigator);
  // console.log(loginType, 'loginTypeloginTypeloginTypeloginType');
  return (
    // <AppRoot
    //   appearance={miniApp.isDark ? 'dark' : 'light'}
    //   platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    // >
    <HashRouter>
      <AutoScrollToTop>
        <Routes>
          {loginType === 'Custom'
            ? customerRoutes.map((route) => {
                return (
                  <Route key={route.path} {...route}>
                    {ChildrenRoutes(route)}
                  </Route>
                );
              })
            : provideRoutes.map((route) => {
                return (
                  <Route key={route.path} {...route}>
                    {ChildrenRoutes(route)}
                  </Route>
                );
              })}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AutoScrollToTop>
    </HashRouter>
    // </AppRoot>
  );
};
