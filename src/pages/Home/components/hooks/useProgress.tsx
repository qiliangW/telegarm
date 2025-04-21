import { useState } from 'react';
import { initHapticFeedback } from '@telegram-apps/sdk';
import SwipeSlider from '../SwipeSlider/SwipeSlider';
import useStore from '@/strore';
export const useProgress = () => {
  const hapticFeedback = initHapticFeedback();
  let [isTouch, setIsTouch] = useState(false);
  const currentLevel = useStore((state: any) => state.currentLevel);
  const [progress, setProgress] = useState(0);
  let decrementInterval: any = null;
  let num = 0;
  let timer: any = null;
  const [fallbackState, setFallbackState] = useState(false);
  const [beginState, setBeginState] = useState(false);
  let touchStartHandler = () => {
    //滑动时隐藏文案和背景操作
    console.log('touchStartHandler');
    setIsTouch(true);
    console.log('progress', progress);
    if (progress === 0) {
      console.log('vvvvv', progress);
      setBeginState(true);
    } else {
      setBeginState(false);
    }
    timer && clearTimeout(timer);
    setFallbackState(false);
    decrementInterval && clearInterval(decrementInterval); // 清除递减定时器
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

  // 开始递减进度条
  const startDecrement = () => {
    decrementInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress > 0) {
          getDecrementNum();
          return prevProgress - getDecrementByLevel();
        } else {
          clearInterval(decrementInterval); // 进度条值为0时停止递减
          num = 0;
          return 0;
        }
      });
    }, 1000);
  };
  const getDecrementNum = () => {
    num -= getDecrementByLevel() * currentLevel.level;
  };
  let touchEndHandler = () => {
    //停止滑动显示文案和背景操作
    setIsTouch(false);
    timer = setTimeout(() => {
      setFallbackState(true);
      startDecrement();
    }, 3000);
  };

  let onSwipeOnce = () => {
    //滑动一次再次记录
    // 根据进度重新计算num
    hapticFeedback.impactOccurred('soft');
    // hapticFeedback.notificationOccurred('success');
    // postEvent('web_app_trigger_haptic_feedback', {
    //   type: 'impact',
    //   impact_style: 'medium',
    // });

    num++;
    setProgress(num / currentLevel.level);
    if (num >= currentLevel.level * 100) {
      //滑动完成
      num = 0;
    }
  };

  let showTip = () => {
    addToast({
      classNames: 'animate__animated animate__fadeIn duration-1s',
      message: (
        <div className="toast-t-wrap toast-t-cmsg-wrap">
          You've nailed the newbie tutorial and scored a cool 50 energy bonus!
        </div>
      ),
      duration: 3000,
    });
  };
  const swipeslderDom = () => {
    return (
      <SwipeSlider
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        onSwipeOnce={onSwipeOnce}
      />
    );
  };
  return {
    isTouch,
    progress,
    setProgress,
    fallbackState,
    beginState,
    swipeslderDom,
  };
};
