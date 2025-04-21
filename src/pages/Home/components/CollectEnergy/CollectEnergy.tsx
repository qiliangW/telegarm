import './CollectEnergy.scss';
import icon_gift from '@/assets/imgs/play/icon-gift.png';
import icon_energy_m from '@/assets/imgs/icon-energy-m.png';
import { LevelTag } from '@/components/LevelTag/LevelTag';
import { useContext, useState, useEffect, useRef } from 'react';
import toast from '@/components/Toast/Toast';
import GenderRadio from '@/components/GenderRadio/GenderRadio';
import icon_tip_sucess from '@/assets/imgs/icon-tip-sucess.png';
import icon_energy from '@/assets/imgs/icon-energy.png';
import icon_warn2 from '@/assets/imgs/icon-warn2.png';

import banner from '@/assets/imgs/play/banner.png';

import icon_toDown from '@/assets/imgs/play/icon_toDown.png';
import { OpenReward, WinReward } from '../Reward/Reward';
import Tip from './Tip';
import useStore from '@/strore';
import { getEnergy, getEnergyPool } from '@/api/energy';
import { handleStartGame, endGame, checkGameTime } from '@/api/game';
import Toast from 'react-hot-toast';
import VideoPlay from '@/pages/Home/components/VideoPlay/VideoPlay';
import pubSub from '@/utils/pubSub';
import dayjs from 'dayjs';
const playIcons_male = import.meta.glob(
  '../../../../assets/imgs/play/playIcon/**/**/*.png'
);
const playIconsMap = {};
for (const path in playIcons_male) {
  playIcons_male[path]().then((mod) => {
    let key = path.replace(
      /.+playIcon\/([^/]+)\/([^/]+)\/([^.]+)\.png$/,
      '$1-$2-$3'
    );
    playIconsMap[key] = mod.default;
  });
}

const playPics = import.meta.glob(
  '../../../../assets/imgs/play/level/**/big/*.png'
);
const playPicsMap = {};
for (const path in playPics) {
  playPics[path]().then((mod) => {
    let key = path.replace(/.+level\/([^/]+)\/([^/]+)\/([^.]+)\.png$/, '$1-$3');
    playPicsMap[key] = mod.default;
  });
}
let globalGameId: any = '';
export const CollectEnergy = () => {
  const currentLevel = useStore((state: any) => state.currentLevel);
  const setUseEnergy = useStore((state: any) => state.setUseEnergy);
  const setEdenToken = useStore((state: any) => state.setEdenToken);
  const setStartGame = useStore((state: any) => state.setStartGame);
  const startGame = useStore((state: any) => state.startGame);
  const previousProgress = useRef(0);
  const loopGetEnergyPoolTimer = useRef<any>(null);
  const [gameId, setGameId] = useState('');
  const gender = useStore((state: any) => state.gender);
  const [energyPool, setEnergyPool] = useState(0);
  const [gameStatus, setGameStatus] = useState('getEnergy');
  const [progress, setProgress] = useState(0);
  const [num, setNum] = useState(0);
  const [isTouch, setIsTouch] = useState(0);
  const [completeGame, setCompleteGame] = useState(false);
  const [token, setToken] = useState(0);
  const checkGameTimeRef: any = useRef(null);
  const [onceGame, setOnceGame] = useState(false);
  const [hasEnery, setHasEnery] = useState(false);
  //const [gameResult, setGameResult] = useState(null);
  const gameResult: any = useRef(null);
  const [showWinReward, setShowWinReward] = useState(false);
  const [EnergyWait, setEnergyWait] = useState(false);
  const [isOpenReward, setIsOpenReward] = useState(false);
  const endTimer: any = useRef(null);
  let bindCollect = async () => {
    //收集能量
    try {
      const res: any = await getEnergy({});
      await setUseEnergy();
      getPollEnergy();
      toastSuccess(res);
    } catch (e) {
      noEnergyShowToastN();
    }
  };

  useEffect(() => {
    if (progress >= 100) {
      setCompleteGame(true);
    } else {
      setCompleteGame(false);
    }
  }, [progress]);

  let [activeIcon, setActiveIcon] = useState('');
  let [activeIconStage, setActiveIconStage] = useState(0);

  useEffect(() => {
    let stage;
    if (progress > 0 && progress <= 33) {
      stage = 1;
    } else if (progress > 33 && progress <= 66) {
      stage = 2;
    } else if (progress > 66 && progress <= 100) {
      stage = 3;
    }
    if (stage) {
      let key = `${gender}-${currentLevel?.level}-${stage}`;
      setActiveIcon(playIconsMap[key]);
      setActiveIconStage(stage);
    } else {
      setActiveIcon('');
      setActiveIconStage(0);
    }
  }, [progress, gender, currentLevel]);

  useEffect(() => {
    const _startGame = async (currentLevels: any) => {
      try {
        const res: any = await handleStartGame({
          userHeaderId: String(currentLevels.id),
          sex: 1,
        });
        setStartGame(true);
        pubSub.publish('resetLoading', false);
        setGameId(res);
        globalGameId = res;
        setGameStatus('begin');
        setUseEnergy();
        endTimer.current = setTimeout(async () => {
          console.log('endGameendGameendGameendGameendGameendGame');
          await endGame({ payId: res, status: 2 });
          pubSub.publish('resetProgress', { progress: 0, num: 0 });
          pubSub.publish('resetLoading', false);
          setGameStatus('end');
          setStartGame(false);
          clearInterval(checkGameTimeRef.current);
        }, 10000);
        console.log('endTimer.current', endTimer.current);
        checkGameTimeRef.current = setInterval(() => {
          checkGameTime({ payId: res });
        }, 5000);
      } catch (e) {
        //   Toast.error(e.message);
        //  console.log('startGame error', e);
        pubSub.publish('resetProgress', { progress: 0, num: 0 });
        pubSub.publish('resetLoading', false);
        setStartGame(false);
      }
    };
    pubSub.subscribe('startGame', _startGame);
    return () => {
      pubSub.unsubscribe('startGame', _startGame);
    };
  }, []);

  useEffect(() => {
    // console.log(progress, previousProgress.current, num, 'progress');
    if (
      progress > 0 &&
      progress < previousProgress.current &&
      progress < 100 &&
      !isTouch
    ) {
      //console.log('dwait');
      setGameStatus('dwait');
    } else {
      if (
        num > 0 &&
        progress > previousProgress.current &&
        !onceGame &&
        !gameId
      ) {
        setOnceGame(true);
        //   setGameStatus('begin');
        // console.log('begin');
        // if (!gameId) {
        //   startGame({ userHeaderId: String(currentLevel.id), sex: 1 })
        //     .then((res: any) => {
        //       // console.log(res, 'startGame');
        //       //  Toast.success(res);
        //       setGameId(res);
        //       setUseEnergy();
        //       checkGameTimeRef.current = setInterval(() => {
        //         // console.log('checkGameTime');
        //         checkGameTime({ payId: res });
        //       }, 5000);
        //     })
        //     .catch((err) => {
        //       Toast.error(err);
        //       setOnceGame(false);
        //     });
        // }
      } else if (progress >= 100) {
        // console.log('reward');
        if (completeGame) return;
        previousProgress.current = 0;
        setOnceGame(false);

        gameResult.current = null;
        endGame({ payId: gameId, status: 1 })
          .then((res: any) => {
            gameResult.current = res;
            clearInterval(checkGameTimeRef.current);
          })
          .catch((e) => {
            clearInterval(checkGameTimeRef.current);
            setOnceGame(false);
            setStartGame(false);
            pubSub.publish('resetLoading', false);
            console.log('endGame error');
          });
        //   .then((res: any) => {
        //     pubSub.publish('resetProgress', { progress: 0, num: 0 });
        //     //  Toast.success('Game over');
        //     //  console.log(res, 'endGame');
        //     setGameId('');
        //     setOnceGame(false);
        //     // setToken(res.token);
        //     // setEdenToken();
        //     setHasEnery(false);
        //     if (res.point) {
        //       setHasEnery(true);
        //       setUseEnergy();
        //     }
        //     // setGameStatus('reward');
        //   })
        //   .catch((err: any) => {
        //     Toast.error(err);
        //     setOnceGame(false);
        //   });
        clearInterval(checkGameTimeRef.current);
      } else {
        if (
          progress > 0 &&
          progress > previousProgress.current &&
          progress < 100
        ) {
          setGameStatus('');
        } else if (
          !isTouch &&
          progress <= 0 &&
          previousProgress.current > progress &&
          !completeGame
        ) {
          //   Toast.error('Game over');
          endGame({ payId: gameId, status: 2 }).then((res) => {
            setGameId('');
            globalGameId = '';
            setStartGame(false);
          });
          // console.log('endGame');
          setGameId('');
          globalGameId = '';
          setOnceGame(false);
          setGameStatus('end');
          clearInterval(checkGameTimeRef.current);
        }
      }
    }
  }, [progress, num, isTouch]);
  const _getProgress = (res: any) => {
    setProgress((currentProgress) => {
      previousProgress.current = currentProgress;
      return res.progress;
    });
    setNum(res.num);
    setIsTouch(res.isTouch);
  };
  useEffect(() => {
    pubSub.subscribe('getProgress', _getProgress);
    return () => {
      setStartGame(false);
      globalGameId && endGame({ payId: globalGameId, status: 2 });
      clearInterval(checkGameTimeRef.current);
      endTimer.current && clearTimeout(endTimer.current);
      pubSub.unsubscribe('getProgress', _getProgress);
    };
  }, []);

  useEffect(() => {
    getPollEnergy();
    return () => {
      clearTimeout(loopGetEnergyPoolTimer.current);
    };
  }, []);
  // 获取能量池能量
  const getPollEnergy = async () => {
    try {
      const res: any = await getEnergyPool({});
      // 考虑到可能用户手动收集能量再获取能量池 （清空定时器）
      clearTimeout(loopGetEnergyPoolTimer.current);
      loopGetEnergyPoolTimer.current = null;
      const currentTime = dayjs().valueOf();
      // 比较两个差值
      const timeFlag = currentTime > dayjs(res.nextSaveTime).valueOf();
      const nextSaveTime =
        dayjs(res.nextSaveTime).valueOf() - currentTime + 3000;
      !timeFlag &&
        (loopGetEnergyPoolTimer.current = setTimeout(() => {
          getPollEnergy();
        }, nextSaveTime));
      setEnergyPool(res.pointAccumulate);
    } catch (e) {
      console.log(e);
    }
  };
  // 收集成功提示
  const toastSuccess = (energy: number) => {
    toast(
      <div className="toast-t-collect-outer">
        <div className="toast-t-wrap toast-t-collect-wrap">
          <img src={icon_tip_sucess} alt="" />
          <div className="txt">Collection successful!</div>
        </div>
        <div className="energy">
          <img src={icon_energy} alt="" />
          <span>+{energy}</span>
        </div>
      </div>
    );
  };

  let noEnergyShowToastN = () => {
    toast(
      <div className="toast-t-wrap toast-t-no-energy-outer">
        <img src={icon_warn2} alt="" />
        <div className="txt">
          Insufficient energy！
          <br />
          Come back in 5 mins.
        </div>
      </div>
    );
  };
  // noEnergyShowToastN();

  let noEnergyShowToast = () => {
    //能量不足20提示
    toast(
      <div className="toast-t-level-fail-outer">
        <div className="toast-t-wrap toast-t-level-wrap">
          <img src={icon_warn2} alt="" />
          <div className="txt">Your energy is less than 20</div>
        </div>
      </div>
    );
  };

  let noEnergyShowToast2 = () => {
    //能量不足提示
    toast(
      <div className="toast-t-level-fail-outer">
        <div className="toast-t-wrap toast-t-level-wrap">
          Energy below 20 <br />
          Tip: Keep signing in daily for bonus energy boosts!
        </div>
      </div>
    );
  };

  let showTip1 = () => {
    //第一次的礼物！ +50的能量提升正等着你！
    toast(
      <div className="toast-t-wrap toast-t-cmsg-wrap">
        First-time Gift! <br />
        Your +50 energy boost awaits you!
      </div>
    );
  };

  let showTip2 = (point) => {
    //新手指导完成奖励提示
    toast(
      <div className="toast-t-wrap toast-t-cmsg-wrap">
        You've nailed the newbie tutorial and scored a cool {point} energy
        bonus!
      </div>,
      {
        duration: 100000,
      }
    );
  };

  let animateToSwiperSlide = () => {
    // 获取目标元素
    const targetDiv = document.querySelector('.c-slider-wrap');
    const rect = targetDiv.getBoundingClientRect();
    window.scroll({
      top: rect.top - 20,
      // left: rect.left + window.pageXOffset,
      behavior: 'smooth',
    });
  };

  const onCompletGame = async () => {
    if (isOpenReward) return;
    setIsOpenReward(true);
    let count = 20;
    const loop = () => {
      return new Promise((resolve, reject) => {
        if (count <= 0) {
          reject('gameResult error');
        }
        if (gameResult.current) {
          resolve(gameResult.current);
        } else {
          setTimeout(() => {
            count--;
            resolve(loop());
          }, 500);
        }
      });
    };
    loop()
      .then((res: any) => {
        pubSub.publish('resetProgress', { progress: 0, num: 0 });
        setShowWinReward(true);
        setIsOpenReward(false);
        setOnceGame(false);
        setGameId('');
        globalGameId = '';
        setToken(res.token);
        setEdenToken();
        setHasEnery(false);
        if (res.playCount === 5 && res.point) {
          setHasEnery(true);
          setUseEnergy();
        }
        // 第一次游戏提示
        if (res.playAllCount == 1) {
          setEnergyWait(true);
          setUseEnergy();
        }
      })
      .catch(() => {
        setOnceGame(false);
        setIsOpenReward(false);
        pubSub.publish('resetProgress', { progress: 0, num: 0 });
        console.log('gameResult error');
      });
    // try {
    //   const res: any = await endGame({ payId: gameId, status: 1 });
    //   pubSub.publish('resetProgress', { progress: 0, num: 0 });
    //   setToken(res.token);
    //   setShowWinReward(true);
    //   setGameId('');
    //   setOnceGame(false);
    //   setEdenToken();
    //   setHasEnery(false);
    //   setEnergyWait(false);
    //   // 五次完成提示
    //   if (res.playCount === 5 && res.point) {
    //     setHasEnery(true);
    //   }
    //   // 第一次游戏提示
    //   if (res.playAllCount == 1) {
    //     setEnergyWait(true);
    //   }
    // } catch (e) {
    //   setOnceGame(false);
    //   console.log(e);
    // }
  };
  const onReward = async () => {
    setShowWinReward(false);
    if (hasEnery) {
      setGameStatus('getEnery');
      setUseEnergy();
      setHasEnery(false);
    }
    if (EnergyWait) {
      setGameStatus('EnergyWait');
      setUseEnergy();
      setEnergyWait(false);
    }
  };

  let [sexPicUrl, setSexPicUrl] = useState('');
  useEffect(() => {
    let bigImg =
      playPicsMap[`${gender}-${currentLevel?.level}`] ||
      playPicsMap[`${gender}-1`];
    setSexPicUrl(bigImg);
  }, [gender, currentLevel]);
  useEffect(() => {
    if (startGame) {
      console.log('startGame');
      if (progress > 0) {
        //    Toast.error('startClear');
        console.log('startDecrement');
        console.log(endTimer.current, 'progress');
        endTimer.current && clearTimeout(endTimer.current);
        endTimer.current = null;
      }
    }
  }, [progress, startGame]);
  return (
    <div className="collect-energy-d-outer">
      <div className={`collect-energy-d-wrap ${gender}`}>
        {/* ${gender == 'female' ? 'show' : ''} */}
        <div className={`pic-p-wrap show`}>
          <img src={sexPicUrl} alt="" />
        </div>
        {progress > 0 && progress <= 100 ? (
          <VideoPlay progress={progress} />
        ) : null}
        {activeIcon ? (
          <img
            src={activeIcon}
            alt=""
            className={`${
              activeIconStage == 2
                ? 'icon_play_tip2 animate__swing'
                : 'icon_play_tip1 animate__tada'
            }   animate__animated duration-1s animate__infinite`}
          />
        ) : null}

        <Tip status={gameStatus} reward={token} hasEnery={hasEnery} />
        {/* 右上角级别 */}
        <LevelTag
          title={currentLevel?.title}
          level={currentLevel?.level}
          levelTotal={currentLevel?.level}
        />

        {/* 设置性别 */}
        <div className="gender-radio-g-outer">
          <GenderRadio />
        </div>

        {/* 收集能量 */}
        <div className="collect-wrap" onClick={bindCollect}>
          <div className="energy-outer">
            {/* 能量进度条 */}
            <div className="progress" style={{ width: energyPool + '%' }}></div>

            <div className="energy-wrap">
              <img src={icon_energy_m} alt="" />
              <span className="num-wrap">
                <span className="num">{energyPool}</span>
                {/* <span className="time">0:00:00</span> */}
              </span>
            </div>
          </div>

          <div className="collect-btn">Collect</div>
        </div>

        {/* 右下角礼物 */}
        <div className="gift-wrap">
          {/* 需要做动画加上类名 */}
          {progress >= 70 && progress < 100 ? (
            <img
              src={icon_gift}
              alt=""
              className="animate__animated duration-1s animate__infinite animate__heartBeat"
            />
          ) : (
            <img src={icon_gift} alt="" />
          )}
        </div>

        <img
          src={icon_toDown}
          alt=""
          className="icon_toDown"
          onClick={animateToSwiperSlide}
        />
      </div>
      {/* 奖励 */}
      {completeGame ? (
        <OpenReward onCompletGame={onCompletGame} loading={isOpenReward} />
      ) : null}
      {/* 打开盲盒 */}
      {showWinReward ? <WinReward reward={token} onReward={onReward} /> : null}
    </div>
  );
};
