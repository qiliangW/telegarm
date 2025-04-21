import { type FC, useEffect, useState } from 'react';
import './index.scss';
// import { TopHeader } from '@/components/TopHeader/TopHeader';
import { Dialog } from 'react-vant';
import { initUtils } from '@telegram-apps/sdk';
import community from '@/assets/imgs/community.png';
import chnageEmail from '@/assets/imgs/change-email.png';
import flowbot from '@/assets/imgs/followbot.png';
import logoutIcon from '@/assets/imgs/log-out.png';
import quitIcon from '@/assets/imgs/quit.png';
import payment from '@/assets/imgs/payment.png';
import useStore from '@/strore';
import dayjs from 'dayjs';
import { getConfigData } from '@/utils/config';
import { replace, useNavigate } from 'react-router-dom';
import { getUserInfo } from '@/api/user';
export const Provider = () => {
  const utils = initUtils();
  const [userInfo, setUserInfo] = useState<any>({});
  const setToken = useStore((state: any) => state.setToken);
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo().then((res: any) => {
      setUserInfo(res.userInfo);
    });
  }, []);
  const loggingOut = () => {
    setToken('');
    navigate('/');
  };
  const logOff = () => {
    Dialog.confirm({
      title: '注销账户',
      message: `您确认注销账户吗？注销账户后，您的所有数据将被永久删除，无法恢复。`,
      onCancel: () => {},
      onConfirm: () => {
        console.log('注销成功');
      },
    });
  };
  const _updatePayment = () => {
    navigate('/payment', {
      state: {
        useraddress: userInfo.address,
      },
    });
  };
  const addGroup = () => {
    //  console.log(getConfigData()?.tgGroup);
    utils.openTelegramLink(getConfigData()?.tgGroup);
  };
  const openBot = () => {
    utils.openTelegramLink(getConfigData()?.tgBot);
  };
  return (
    <div className="user-box">
      <div className="aaa">
        <div className="user-top">
          <div className="user-avatar">
            <img src={userInfo.headerImg} alt="" className="avatar" />
          </div>
          <div className="user-info">
            <div className="user-email">
              <div className="email">{userInfo.email}</div>
            </div>
            <div className="user-email-time">
              <div className="email-tip">注册日期</div>
              <div className="email">
                {dayjs(userInfo.CreatedAt).format('YYYY-MM-DD')}
              </div>
            </div>
          </div>
        </div>
        <div className="use-box-time">
          <div className="line"></div>
          <div className="use-all-time">
            <p>{userInfo.originSetting?.left ?? '- -'}</p>
            <span>总时长</span>
          </div>
          <div className="use-remaining-time">
            <p>{userInfo.originSetting?.total ?? '- -'}</p>
            <span>剩余时长</span>
          </div>
        </div>
      </div>
      <div className="user-btn-box">
        <div className="user-btn-box-item" onClick={_updatePayment}>
          <img src={payment} alt="" className="brn-icon" />
          <div className="new-order-title">设置收款地址</div>
          <div className="order-duration-box"></div>
        </div>
        <div className="user-btn-box-item" onClick={addGroup}>
          <img src={community} alt="" className="brn-icon" />
          <div className="new-order-title">加入社区</div>
          <div className="order-duration-box"></div>
        </div>
        <div className="user-btn-box-item" onClick={openBot}>
          <img src={flowbot} alt="" className="brn-icon" />
          <div className="new-order-title">关注BOT</div>
          <div className="order-duration-box"></div>
        </div>
        <div className="user-btn-box-item">
          <img src={chnageEmail} alt="" className="brn-icon" />
          <div className="new-order-title">更换邮箱</div>
          <div className="order-duration-box"></div>
        </div>
        <div className="user-btn-box-item" onClick={logOff}>
          <img src={logoutIcon} alt="" className="brn-icon" />
          <div className="new-order-title">注销账户</div>
          <div className="order-duration-box"></div>
        </div>
        <div className="user-btn-box-item" onClick={loggingOut}>
          <img src={quitIcon} alt="" className="brn-icon" />
          <div className="new-order-title">安全退出</div>
          <div className="order-duration-box"></div>
        </div>
      </div>
    </div>
  );
};
