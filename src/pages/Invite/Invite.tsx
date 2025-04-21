import { useNavigate } from 'react-router-dom';
import { InviteReward } from '@/components/InviteReward/InviteReward';
import './Invite.scss';
import pic from '@/assets/imgs/invite/pic.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from '@/components/Toast/Toast';
import icon_tip_sucess from '@/assets/imgs/icon-tip-sucess.png';
import icon_copy from '@/assets/imgs/invite/icon-copy.png';

import { inviteList } from '@/api/invite';
import { useEffect, useState } from 'react';
import { initUtils } from '@telegram-apps/sdk';
import { useLaunchParams } from '@telegram-apps/sdk-react';
const InviteItem = ({ title, content }) => {
  return (
    <div className="invite-item-wrap">
      <div className="invite-item-tit">{title}</div>
      <div className="invite-item-cont">{content}</div>
    </div>
  );
};

export const Invite = () => {
  const lp = useLaunchParams();
  const { initData }: any = lp;
  const { id } = initData?.user;
  const utils = initUtils();
  const navigate = useNavigate(); //react-router-dom
  let toInviteRecords = () => {
    navigate('/inviteRecords');
  };

  let [copyText, setCopyText] = useState(
    `https://t.me/Eden_sexualfi_bot/gamefi?startapp=referral_${id}`
  );
  const [copied, setCopied] = useState(false);
  const [total, setToal] = useState(0);
  const [token, setToken] = useState(0);
  const share = () => {
    utils.shareURL(
      `https://t.me/Eden_sexualfi_bot/gamefi?startapp=referral_${id}`,
      'Let’s do it! Earn EDEN coins while you enjoy with healers.'
    );
  };
  useEffect(() => {
    async function getInviteList(): Promise<any> {
      const res: any = await inviteList({});
      const total = res?.tableInfo?.total;
      setToal(total);
      setToken(res.totalAward ?? 0);
    }

    getInviteList();
  }, []);
  let copyLink = () => {
    // utils.shareURL(
    //   'https://t.me/Eden_sexualfi_bot/gamefi?startapp=referral_123456789',
    //   'Exper ... bounds'
    // );
    setCopyText(
      `https://t.me/Eden_sexualfi_bot/gamefi?startapp=referral_${id}`
    );
    toast(
      <div className="toast-t-sign-suc-outer">
        <div className="toast-t-wrap toast-t-sign-wrap">
          <img src={icon_tip_sucess} alt="" />
          <div className="txt">Copy link!</div>
        </div>
      </div>
    );
  };

  return (
    <div className="invite-i-outer">
      {/* <TopHeader/> */}

      <div className="banner-wrap">
        <img src={pic} alt="" />
        <div className="invite-title">
          Invite friends to get <br />
         extra Bonus
        </div>
      </div>

      <InviteReward
        isToken={false}
        reward={token}
        unit="ENERGY"
        num={total}
        onClickFn={toInviteRecords}
      />

      <div className="invite-list-wrap">
        <InviteItem title="Invite a friend" content="+50 Energy for you " />
        {/* <InviteItem
          title="Invite a friend to buy Forbidden Fruits"
          content="+300 EDEN for you and your friend each"
        /> */}
      </div>

      <div className="invite-btns-wrap">
        <span className="invite-btn zoomAnimate" onClick={share}>
          Invite friends to earn more
        </span>
        <CopyToClipboard text={copyText}>
          <span className="copy-btn" onClick={copyLink}>
            <img src={icon_copy} alt="" />
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
};
