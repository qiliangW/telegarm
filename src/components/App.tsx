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
import { setConfigData } from '@/utils/config';
import AutoScrollToTop from '@/components/AutoScrollToTop/AutoScrollToTop';
import { userLogin } from '@/api/login';

import { checkTask } from '@/api/task';

import { Toaster, resolveValue, toast } from 'react-hot-toast';
import '@/components/Toast/Toast.scss';

import { customerRoutes } from '@/navigation/routes';
import useStore from '@/strore';
import { error } from 'console';
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
  const setToken = useStore((state: any) => state.setToken);
  const token = useStore((state: any) => state.token);
  const closeUser = useClosingBehavior();
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  useEffect(() => {
    const { initData, initDataRaw }: any = lp;
    closeUser?.enableConfirmation();
    viewport?.expand();
    const { firstName, lastName, id } = initData?.user;
    // let referrerId = null;
    // const startParameter = initData.startParam;
    // if (startParameter && startParameter.startsWith('referral_')) {
    //   referrerId = startParameter.split('_')[1];
    // }
    try {
      _getToken(firstName, lastName, id, initDataRaw).then(() => {
        setConfigData();
      });
    } catch (e) {
      console.log(e, 'hjhjhjhj');
    }
  }, []);
  const _getToken = (
    firstName: string,
    lastName: string,
    id: number,
    initDataRaw: any
  ) => {
    return axios
      .post(
        '/api/stresser/login',
        { firstName, lastName, id },
        {
          headers: {
            Authorization: `tma ${initDataRaw}`,
          },
        }
      )
      .then((res: any) => {
        setToken(res.data.data);
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  // const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
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
          {customerRoutes.map((route) => {
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
