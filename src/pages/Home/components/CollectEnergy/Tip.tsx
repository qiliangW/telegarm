import './Tip.scss';

import play_tip_begin from '@/assets/imgs/play/play-tip-begin.png';
import play_tip_r_end from '@/assets/imgs/play/play-tip-r-end.png';
import play_tip_dwait from '@/assets/imgs/play/play-tip-dwait.png';
import play_tip_end from '@/assets/imgs/play/play-tip-end.png';
import icon_energy from '@/assets/imgs/icon-energy.png';

import icon_token from '@/assets/imgs/icon-token.png';
import { useState, useEffect } from 'react';
function Popup({ message, duration = 0 }) {
  const [isVisible, setIsVisible] = useState(true);
  // useEffect(() => {
  //   let timer;
  //   if (isVisible && duration) {
  //     // 设置一个定时器，在duration毫秒后隐藏组件
  //     timer = setTimeout(() => {
  //       setIsVisible(false);
  //     }, duration);
  //   }
  //   // 清理函数，清除定时器
  //   return () => {
  //     if (timer) clearTimeout(timer);
  //   };
  // }, [isVisible, duration]);

  if (!isVisible) return null;
  return message;
}

// 游戏开始提示
export const TipBegin = () => {
  return (
    <div className="c-t-begin">
      <div className="img-wrap">
        <img
          src={play_tip_begin}
          alt=""
          className="animate__animated animate__fadeIn duration-1s"
        />
      </div>

      <div className="txt-wrap animate__animated animate__fadeIn duration-1s">
        <img src={icon_energy} alt="" />
        <span> -20</span>
      </div>
    </div>
  );
};

// 游戏不能停提示
export const TipDontWait = () => {
  return (
    <div className="c-t-dwait-outer">
      <div className="c-t-dwait-wrap animate__animated animate__fadeIn duration-1s">
        <span className="txt">Don't keep the healer waiting!</span>
        <img src={play_tip_dwait} alt="" />
      </div>
    </div>
  );
};

// 游戏结束奖励提示
export const TipReward = (reward: any) => {
  if (reward === 0) return null;
  return (
    <div className="c-t-reward-outer">
      <div className="c-t-reward-wrap animate__animated animate__fadeIn duration-1s">
        <div className="pic">
          <img src={play_tip_r_end} alt="" />
        </div>
        <div className="reward-w">
          <img src={icon_token} alt="" />
          <span className="reward">+{reward}</span>
        </div>
      </div>
    </div>
  );
};
const TipEnery = () => {
  return (
    <div className="c-t-enger-outer">
      <div className="toast-t-wrap toast-t-cmsg-wrap toast-t-cmsg-wrap">
        You’ve thrilled your healer 5 times today! Claim your well-deserved
        energy as a reward!
      </div>
      <div className="txt-wrap animate__animated animate__fadeIn duration-1s">
        <img src={icon_energy} alt="" />
        <span>+20</span>
      </div>
    </div>
  );
};
const TipEneryWait = () => {
  return (
    <div className="c-t-enger-outer">
      <div className="toast-t-wrap toast-t-cmsg-wrap toast-t-cmsg-wrap">
        First-time Gift! Your +50 energy boost awaits you!
      </div>
    </div>
  );
};
// 游戏结束提示
export const TipEnd = () => {
  return (
    <div className="c-t-end-outer">
      <div className="c-t-end-wrap animate__animated animate__fadeIn duration-1s">
        <div className="pic">
          <img src={play_tip_end} alt="" />
        </div>
        <div className="end-txt">The healer didn't reach orgasm</div>
      </div>
    </div>
  );
};

export default function Tip({ status, reward = 0, hasEnery = false }) {
  const [activeTips, setActiveTips] = useState([]);
  const [showDontStopTip, setShowDontStopTip] = useState(false);
  useEffect(() => {
    // 根据状态显示相应的提示，并设置定时器
    if (status === 'begin' && !activeTips.includes('begin')) {
      setActiveTips((prevTips) => [...prevTips, 'begin']);
      setTimeout(() => {
        setActiveTips((prevTips) => prevTips.filter((tip) => tip !== 'begin'));
      }, 3000);
    }
    if (status === 'dwait' && !activeTips.includes('dwait')) {
      setShowDontStopTip(true);
    } else {
      setShowDontStopTip(false);
    }
    if (status === 'getEnery' && !activeTips.includes('getEnery')) {
      setActiveTips((prevTips) => [...prevTips, 'getEnery']);
      setTimeout(() => {
        setActiveTips((prevTips) =>
          prevTips.filter((tip) => tip !== 'getEnery')
        );
      }, 3000);
    }
    if (status === 'EnergyWait' && !activeTips.includes('EnergyWait')) {
      setActiveTips((prevTips) => [...prevTips, 'EnergyWait']);
      setTimeout(() => {
        setActiveTips((prevTips) =>
          prevTips.filter((tip) => tip !== 'EnergyWait')
        );
      }, 3000);
    }
    if (status === 'end' && !activeTips.includes('end')) {
      setActiveTips((prevTips) => [...prevTips, 'end']);
      setTimeout(() => {
        setActiveTips((prevTips) => prevTips.filter((tip) => tip !== 'end'));
      }, 3000);
    }
  }, [status]);

  return (
    <>
      {activeTips.includes('EnergyWait') && <Popup message={TipEneryWait()} />}
      {activeTips.includes('getEnery') && <Popup message={TipEnery()}></Popup>}
      {activeTips.includes('begin') && <Popup message={TipBegin()} />}
      {showDontStopTip ? <Popup message={TipDontWait()} /> : null}
      {/* {activeTips.includes('getEnery') && <Popup message={TipReward(reward)} />} */}
      {activeTips.includes('end') && <Popup message={TipEnd()} />}
    </>
  );
}
