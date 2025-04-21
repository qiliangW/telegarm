import {
  type FC,
  type MouseEventHandler,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  NavLink,
  type LinkProps,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { navConfigForCustom, navConfigForProvider } from '@/config/navConfig';
import useStore from '@/strore';
import { Tabbar } from 'react-vant';
import './Navs.scss';
// import icon1 from '@/assets/imgs/home/tabs/icon1.png';
// import icon2 from '@/assets/imgs/home/tabs/icon2.png';
// import icon3 from '@/assets/imgs/home/tabs/icon3.png';
// import icon4 from '@/assets/imgs/home/tabs/icon4.png';

export const Navs = () => {
  const location = useLocation();
  const [name, setName] = useState(location.pathname);
  const navigate = useNavigate(); //react-router-dom
  const loginType = useStore((state: any) => state.loginType);
  // 根据用户类型加载导航配置
  const navConfig =
    loginType === 'Custom' ? navConfigForCustom : navConfigForProvider;
  const switchPages = (val: any) => {
    setName(val);
    navigate(val);
  };
  useEffect(() => {
    setName(location.pathname); // 更新当前选中的 Tab
  }, [location.pathname]);
  return (
    <Tabbar onChange={switchPages} value={name} className="custom-tab">
      {navConfig.map((item) => (
        <Tabbar.Item
          key={item.name}
          icon={(active) => (
            <img
              src={item.renderIcon(active)}
              alt=""
              style={{ width: '26px', height: '26px' }}
            />
          )}
          name={item.name}
          className={name === item.name ? 'tab-active' : ''}
        >
          {item.label}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
};
