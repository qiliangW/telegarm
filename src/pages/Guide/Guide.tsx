import type { FC } from 'react';
import { useEffect, type FC } from 'react';
import useStore from '@/strore';

import { useNavigate } from 'react-router-dom';

import './Guide.scss';

import GenderRadio from '@/components/GenderRadio/GenderRadio';

import { Navs } from '@/components/Navs/Navs';
import { TopHeader } from '@/components/TopHeader/TopHeader';

import { Invite } from '@/pages/Home/components/Invite/Invite';
import { CollectEnergy } from '@/pages/Home/components/CollectEnergy/CollectEnergy';
import { Slide } from '@/pages/Home/components/Slide/Slide';

import icon_energy_m from '@/assets/imgs/icon-energy-m.png';

import icon_step from '@/assets/imgs/guide/icon-step.png';
import icon_star from '@/assets/imgs/guide/icon-star.png';

import pic1 from '@/assets/imgs/guide/pic1.png';
import pic_reward_pic from '@/assets/imgs/guide/pic-reward-pic.png';
import pic_reward_txt from '@/assets/imgs/guide/pic-reward-txt.png';
import icon_token from '@/assets/imgs/icon-token.png';
import icon_energy from '@/assets/imgs/icon-energy.png';

import { finishTask } from '@/api/task';

export const GuidePage: FC = () => {
  const isFirstUse = useStore((state: any) => state.isFirstUse);
  const setIsFirstUse = useStore((state: any) => state.setIsFirstUse);

  const firstUseIndex = useStore((state: any) => state.firstUseIndex);
  const setFirstUseIndex = useStore((state: any) => state.setFirstUseIndex);

  const setUseEnergy = useStore((state: any) => state.setUseEnergy);

  const navigate = useNavigate(); //react-router-dom

  useEffect(() => {
    if (!isFirstUse) {
      navigate('/home/play', { replace: true });
    }
  }, [isFirstUse]);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setFirstUseIndex(2)
  //   }, 2000)
  // }, [])
  let jumpOneStep = () => {
    setFirstUseIndex(2);
  };
  let bindCollect = () => {
    setFirstUseIndex(3);
  };
  let bindSetGender = () => {
    setTimeout(() => {
      setFirstUseIndex(4);
    }, 500);
  };
  let flag = true;
  let getReward = async () => {
    //完成指导
    try {
      if (!flag) return;
      flag = false;
      await finishTask({ taskId: 1 });
      await setUseEnergy();
      setFirstUseIndex(5);
      setTimeout(() => {
        setIsFirstUse(false);
        navigate('/home/play', { replace: true });
      }, 4000);
    } catch (e) {
      setIsFirstUse(true);
      navigate('/home/play', { replace: true });
    }
  };
  return (
    <div className="guide-page-g-wrap">
      <div className="guide-top-g-wrap">
        <TopHeader />
        <Invite />
        <div className="guide-mask"></div>
      </div>

      <div className={`guide-col-c-wrap ${firstUseIndex == 2 ? 'act' : ''}`}>
        <CollectEnergy />

        <div className="guide-mask"></div>
        <div className="collect-wrap" onClick={bindCollect}>
          <div className="energy-wrap">
            <img src={icon_energy_m} alt="" />
            <span className="num-wrap">
              <span className="num">0</span>
              {/* <span className="time">0:00:00</span> */}
            </span>
          </div>
          <div className="collect-btn">Collect</div>
        </div>

        {firstUseIndex == 2 ? (
          <div
            className="guide-step-s-wrap guide-step-s-wrap1"
            onClick={bindCollect}
          >
            <span className="txt">
              Step 1: Remember to collect energy every hour
            </span>
            <div className="img-wrap">
              {' '}
              <img src={icon_step} alt="" />
            </div>
            <div className="star">
              <img src={icon_star} alt="" />
            </div>
          </div>
        ) : null}
        {firstUseIndex == 3 ? (
          <div
            className="guide-step-s-wrap guide-step-s-wrap2"
            onClick={bindSetGender}
          >
            <span className="txt">
              Step 2: Switch between male and female healer{' '}
            </span>
            <div className="img-wrap">
              {' '}
              <img src={icon_step} alt="" />
            </div>
            <div className="star">
              <img src={icon_star} alt="" />
            </div>
          </div>
        ) : null}

        <div
          className={`gender-radio-g-outer ${firstUseIndex == 3 ? 'act' : ''}`}
        >
          <GenderRadio pBindSetGender={bindSetGender} />
        </div>
      </div>

      <div
        className={`guide-slide-g-wrap ${firstUseIndex == 4 ? '' : ''} ${
          firstUseIndex == 5 ? 'low' : ''
        }`}
      >
        {firstUseIndex == 4 ? null : <div className="guide-mask"></div>}

        <Slide firstUseReward={getReward} />
        {firstUseIndex == 4 ? (
          <div
            className="guide-step-s-wrap guide-step-s-wrap3"
            onClick={getReward}
          >
            <span className="txt">
              Step 3: Swipe up and down on the touchpad to help the healer reach
              orgasm and earn rewards! 🎉
            </span>
            <div className="img-wrap">
              {' '}
              <img src={icon_step} alt="" />
            </div>
            <div className="star">
              <img src={icon_star} alt="" />
            </div>
          </div>
        ) : null}
      </div>

      <Navs />

      <div className="guide-bot-mask"></div>

      {firstUseIndex == 1 ? (
        <div className="guide-pic1-p-wrap" onClick={jumpOneStep}>
          <img src={pic1} alt="" />
        </div>
      ) : null}

      {firstUseIndex == 5 ? (
        <div className="guide-reward-r-wrap">
          <div className="pic-wrap animate__bounceInDown animate__animated  duration-1s ">
            <img src={pic_reward_pic} alt="" />
          </div>
          <div className="reward animate__zoomIn animate__animated  duration-1s animate__delay-1s">
            <img src={icon_energy} alt="" />
            <span>+50</span>
          </div>

          <div className="txt animate__fadeIn animate__animated  duration-1s animate__delay-1s">
            <img src={pic_reward_txt} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
};
