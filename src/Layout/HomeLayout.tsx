import { useEffect, useRef, useState } from 'react';
import './HomeLayout.scss';
import { Navs } from '@/components/Navs/Navs';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { Outlet } from 'react-router-dom';
import { provideRoutes, customerRoutes } from '@/navigation/routes';
export const HomeLayout = () => {
  const [navsHeight, setNavsHeight] = useState(0); // 存储 Navs 的高度
  const navsRef = useRef<HTMLDivElement>(null); // 创建 ref
  const loginType = localStorage.getItem('loginType') || 'A';
  const routes = loginType === 'A' ? provideRoutes : customerRoutes;
  useEffect(() => {
    if (navsRef.current) {
      // 获取 Navs 的高度
      setNavsHeight(navsRef.current.offsetHeight);
    }
  }, []);
  return (
    <div className="home-page-h-wrap">
      {/* <TopHeader /> */}

      <Outlet />

      <div ref={navsRef}>
        <Navs />
      </div>
    </div>
  );
};
