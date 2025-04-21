import { useState } from 'react';
import { useContext } from 'react';
import toast from '@/components/Toast/Toast';

import './LevelItem.scss';

import icon_level_lock from '@/assets/imgs/play/icon-level-lock.png';
import icon_token from '@/assets/imgs/icon-token.png';
import icon_warn2 from '@/assets/imgs/icon-warn2.png';
import icon_warn from '@/assets/imgs/icon-warn.png';
import Toast from 'react-hot-toast';
import { LevelTag } from '@/components/LevelTag/LevelTag';
import UpgradeSuccessful from '../UpgradeSuccessful/UpgradeSuccessful';
import { unlockHealer } from '@/api/login';
import { queryToken } from '@/api/user';
import useStore from '@/strore';

const playPics = import.meta.glob(
  '../../../../assets/imgs/play/level/**/small/*.png'
);
const playPicsMap = {};
for (const path in playPics) {
  playPics[path]().then((mod) => {
    let key = path.replace(/.+level\/([^/]+)\/([^/]+)\/([^.]+)\.png$/, '$1-$3');
    playPicsMap[key] = mod.default;
  });
}

interface LevelItemProps {
  title: string;
  level: number;
  levelTotal: number;
  score: number;
  id: number;
  interactionUse: number;
  unLockStatus: string;
  refreshList: () => void; // Add refreshList prop
  bgImg: any;
}
export const LevelItem = ({
  title,
  level,
  levelTotal,
  score,
  id,
  interactionUse,
  unLockStatus,
  refreshList, // Add refreshList prop
}: LevelItemProps) => {
  const [confirmFlag, setConfirmFlag] = useState(false);
  const currentLevel = useStore((state: any) => state.currentLevel);
  const gender = useStore((state: any) => state.gender);
  const startGame = useStore((state: any) => state.startGame);
  const setCurrentLevel = useStore((state: any) => state.setCurrentLevel);
  const setEdenToken = useStore((state: any) => state.setEdenToken);

  let gameGoing = () => {
    toast(
      <div className="toast-t-wrap toast-t-no-energy-outer">
        <img src={icon_warn2} alt="" />
        <div className="txt">Game in progress</div>
      </div>
    );
  };
  let bindSelectLevel = async () => {
    //选择级别
    if (startGame) return;
    if (Number(unLockStatus)) {
      setCurrentLevel({ level, title, id, interactionUse });
    } else {
      const res: any = await queryToken();
      //token足够
      if (res?.tokenBalance >= score) {
        setConfirmFlag(true);
      } else {
        toast(
          <div className="toast-t-level-fail-outer">
            <div className="toast-t-wrap toast-t-level-wrap">
              <img src={icon_warn} alt="" />
              <div className="txt">EDEN coin is insufficient！</div>
            </div>
          </div>
        );
      }
    }
  };

  const confirmBuy = (event: any) => {
    event.stopPropagation();
    unlockHealer({ healerId: id })
      .then((res) => {
        setConfirmFlag(false);
        setEdenToken();
        refreshList(); // Refresh list
      })
      .catch((err: any) => {
        Toast.error(err);
      });
  };
  const cancelBuy = (event: any) => {
    event.stopPropagation();
    setConfirmFlag(false);
  };

  let bigImg = playPicsMap[`${gender}-${level}`] || playPicsMap[`${gender}-1`];

  return (
    <div className="p-level-item-wrap" onClick={bindSelectLevel}>
      {currentLevel.level == level ? <div className="border"></div> : null}
      <img
        src={bigImg}
        alt=""
        className={`p-level-bg ${unLockStatus == 1 ? 'unlock' : ''}`}
      />
      <LevelTag title={title} level={level} levelTotal={levelTotal} />
      {unLockStatus == 1 ? null : (
        <div className="p-level-item">
          <div className="pic-wrap">
            <img src={icon_level_lock} alt="" />
          </div>

          <div className="nums-wrap">
            <img src={icon_token} alt="" />
            <span className="num">{score}</span>
          </div>
        </div>
      )}

      {confirmFlag ? (
        <UpgradeSuccessful
          token={score}
          playCurrentLevel={confirmBuy}
          cancelPlayCurrentLevel={cancelBuy}
        />
      ) : null}
    </div>
  );
};
