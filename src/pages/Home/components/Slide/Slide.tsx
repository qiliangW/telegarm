import './Slide.scss';
import toast from '@/components/Toast/Toast';

import slide_bg from '@/assets/imgs/play/slide-bg.png';
import emo1 from '@/assets/imgs/play/emo1.gif';
import emo2 from '@/assets/imgs/play/emo2.gif';
import emo3 from '@/assets/imgs/play/emo3.gif';
import loadingGif from '@/assets/imgs/loading.gif';

import icon_warn2 from '@/assets/imgs/icon-warn2.png';
import { initHapticFeedback, initPopup } from '@telegram-apps/sdk';
import { Progress } from '@/components/Progress/Progress';
import SwipeSlider from '../SwipeSlider/SwipeSlider';
import { useEffect, useState, createContext, useRef, useCallback } from 'react';
import pubSub from '@/utils/pubSub';
import useStore from '@/strore';
import Toast from 'react-hot-toast';
import dayjs from 'dayjs';

export const Slide = ({ firstUseReward }) => {
  const isFirstUse = useStore((state: any) => state.isFirstUse);
  const setStartGame = useStore((state: any) => state.setStartGame);
  const startGame = useStore((state: any) => state.startGame);
  const hapticFeedback = initHapticFeedback();
  const popup = initPopup();
  let [isTouch, setIsTouch] = useState(false);
  const currentLevel = useStore((state: any) => state.currentLevel);
  const setUseEnergy = useStore((state: any) => state.setUseEnergy);
  const useEnergy = useStore((state: any) => state.useEnergy);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  let decrementInterval: any = useRef(null);
  let num = useRef(0);
  let timer: any = useRef(null);
  let touchStartHandler = () => {
    //滑动时隐藏文案和背景操作
    setIsTouch(true);
    timer.current && clearTimeout(timer.current);
    decrementInterval.current && clearInterval(decrementInterval.current); // 清除递减定时器
  };
  const getDecrementByLevel = (): any => {
    const levelMap = new Map([
      [1, 0.5],
      [2, 0.75],
      [3, 1],
      [4, 1.25],
      [5, 1.5],
    ]);
    return levelMap.get(currentLevel.level);
  };
  useEffect(() => {
    //  Toast.success(String(isFirstUse));
    if (!isFirstUse) {
      //首次使用（新手指导）特殊处理
      pubSub.publish('getProgress', { progress, isTouch, num: num.current });
    }
  }, [progress, isTouch, isFirstUse]);
  useEffect(() => {
    const resetProgress = () => {
      setProgress(0);
      num.current = 0;
      setStartGame(false);
    };
    pubSub.subscribe('resetProgress', resetProgress);
    return () => {
      pubSub.unsubscribe('resetProgress', resetProgress);
    };
  }, []);
  // 开始递减进度条progress到100停止

  const startDecrement = () => {
    decrementInterval.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 100;
        if (prevProgress > 0) {
          getDecrementNum();
          return prevProgress - getDecrementByLevel();
        } else {
          setStartGame(false);
          clearInterval(decrementInterval.current); // 进度条值为0时停止递减
          num.current = 0;
          return 0;
        }
      });
    }, 1000);
  };
  const getDecrementNum = () => {
    num.current -= getDecrementByLevel() * currentLevel.level;
  };
  let touchEndHandler = () => {
    //停止滑动显示文案和背景操作
    setIsTouch(false);
    timer.current = setTimeout(() => {
      startDecrement();
    }, 3000);
  };
  //不能游戏
  const unEnableGame = async () => {
    const needEnergy = currentLevel.interactionUse;
    await setUseEnergy();
    if (useEnergy < needEnergy) {
      return false;
    }
    return true;
  };
  const onSwipeOnce = async () => {
    if (!startGame) return;
    // if (!num.current && !(await unEnableGame())) {
    //   noEnergyShowToast();
    //   return;
    // }

    if (progress >= 100) {
      num.current = 0;
      return;
    }
    num.current++;
    // if (progress >= 100) return;
    setProgress(
      num.current / currentLevel.level >= 100
        ? 100
        : num.current / currentLevel.level
    );
    if (num.current >= currentLevel.level * 100) {
      //滑动完成
      setProgress(100);
    }
  };

  let noEnergyShowToast = (needEnergy) => {
    //能量不足20提示
    toast(
      <div className="toast-t-level-fail-outer">
        <div className="toast-t-wrap toast-t-level-wrap">
          <img src={icon_warn2} alt="" />
          <div className="txt">Your energy is less than {needEnergy}</div>
        </div>
      </div>
    );
  };
  let showTip2 = (energy) => {
    //能量奖励
    toast(
      <div className="toast-t-wrap toast-t-cmsg-wrap">
        First pleasure! Enjoy your +{energy} energy boost for your next
        pleasure!
      </div>
    );
  };
  let showTip3 = (count) => {
    //今天完成了5次，治疗师有额外的奖励
    toast(
      <div className="toast-t-wrap toast-t-cmsg-wrap">
        Today’s pleasure count: {count}! The healer has an extra energy for you!
      </div>
    );
  };
  let showTip4 = () => {
    //游戏结束(没有达到100%)
    toast(
      <div className="toast-t-wrap toast-t-cmsg-wrap">
        Game over! <br /> The healer didn't reach orgasm.
      </div>
    );
  };

  const renderEmo = () => {
    // console.log(progress, 'renderEmo');
    if (progress > 0 && progress < 40) {
      return (
        <span className="emo emo1" style={{ left: progress - 5 + '%' }}>
          <img
            src={emo1}
            alt=""
            className="animate__animated animate__fadeIn duration-1s"
          />
        </span>
      );
    } else if (progress >= 40 && progress < 70) {
      return (
        <span className="emo emo2" style={{ left: progress - 5 + '%' }}>
          <img
            src={emo2}
            alt=""
            className="animate__animated animate__fadeIn duration-1s"
          />
        </span>
      );
    } else if (progress >= 70) {
      return (
        <span className="emo emo3" style={{ left: progress - 5 + '%' }}>
          <img
            src={emo3}
            alt=""
            className="animate__animated animate__fadeIn duration-1s"
          />
        </span>
      );
    }
  };
  let onFirstUseTouchStart = () => {
    //首次使用时
    //滑动时隐藏文案和背景操作
    setIsTouch(true);
  };
  let onFirstUseTouchEnd = () => {
    //首次使用时
    //停止滑动显示文案和背景操作
    setIsTouch(false);
  };
  let onFirstUseTouchOnce = () => {
    //首次使用时 滑动超过2次即可完成
    //滑动一次再次记录
    // 根据进度重新计算num
    // hapticFeedback.impactOccurred('soft');

    num.current++;
    // if (progress >= 100) return;
    setProgress(num.current / currentLevel.level);
    if (num.current >= 3) {
      firstUseReward && firstUseReward();
    }
  };

  let onTouchStart = touchStartHandler;
  let onTouchEnd = touchEndHandler;
  let onSwipeOnceN = onSwipeOnce;
  useEffect(() => {
    const resetLoading = (val: boolean) => {
      setLoading(false);
    };
    pubSub.subscribe('resetLoading', resetLoading);
    return () => {
      pubSub.unsubscribe('resetLoading', resetLoading);
    };
  }, []);
  const _startGame = async () => {
    const needEnergy = currentLevel.interactionUse;
    if (!(await unEnableGame())) return noEnergyShowToast(needEnergy);
    if (loading) return;
    setLoading(true);
    pubSub.publish('startGame', currentLevel);
  };
  return (
    <div className="c-slide-outer">
      <div className="progress-ps-wrap">
        <Progress percent={progress + '%'} />

        <div className="emo-wrap">
          {/* 每次只显示一个 */}
          {renderEmo()}
        </div>
      </div>

      <div className="c-slider-wrap">
        {startGame || isFirstUse ? null : (
          <div className="start-btn" onClick={_startGame}>
            Start
            {loading ? <img src={loadingGif} alt="" /> : null}
          </div>
        )}

        {/* 游戏开始或者首次使用显示 */}
        {isFirstUse || startGame ? (
          <SwipeSlider
            onTouchStart={isFirstUse ? onFirstUseTouchStart : touchStartHandler}
            onTouchEnd={isFirstUse ? onFirstUseTouchEnd : touchEndHandler}
            onSwipeOnce={isFirstUse ? onFirstUseTouchOnce : onSwipeOnce}
          />
        ) : null}

        {/* <div className="center-line"></div> */}

        {/* <div className="dash-line dash-line1"></div>
            <div className="dash-line dash-line2"></div> */}

        {/* strong/weak在点击start后显示 */}
        {isFirstUse || startGame ? <div className="c-txt-1">Strong</div> : null}
        {isFirstUse || startGame ? <div className="c-txt-2">Weak</div> : null}

        {!isTouch ? <img src={slide_bg} alt="" className="c-bg" /> : null}

        {/* 左边提示在start后显示 滑动过程中隐藏 */}
        {(isFirstUse || startGame) && !isTouch ? (
          <div className="c-tip">
            Help Eden Healers to reach <br />
            orgasm and get EDEN !{' '}
          </div>
        ) : null}
      </div>
    </div>
  );
};
