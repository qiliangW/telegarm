let open_bg = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/open_bg.png';
let open_pic = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/open_pic.png';

let win_token = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/win_token.png';
let win_icon = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/win_icon.png';
let pic_txt1 = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/txt1.png'
let pic_txt2 = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/txt2.png'
let pic_txt3 = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/txt3.png'
let pic_txt4 = 'https://js.minapp.eden.sexualfi.com/tg-assets/play/reward/txt4.png'

import loadingGif from '@/assets/imgs/loading.gif'
import './Reward.scss';
import { useState } from 'react';

export const OpenReward = ({ onCompletGame,loading }) => {
  //开奖
  return (
    <div className="open-reward-o-outer">
      <div className="open-reward-o-wrap">
        <div className="title">
          {/* Try your luck! */}
          <img src={pic_txt1} alt="" />
        </div>
        <div className="tip">
          {/* Open to reveal your surprise! */}
            <img src={pic_txt2} alt="" />
        </div>
        <div className="pic-wrap ">
          <img
            src={open_bg}
            alt=""
            className="bg animate__shakeY animate__animated   animate__infinite"
          />
          <img src={open_pic} alt="" className="pic" />
        </div>
        <div className="btn-wrap">
          <span className="btn" onClick={onCompletGame}>
            Open
             {loading ?<img src={loadingGif} alt="" />:null}

          </span>
        </div>
      </div>
    </div>
  );
};

export const WinReward = ({ reward, onReward }) => {
  //中奖
  let [visible, setVisible] = useState(false);
  setTimeout(() => setVisible(true), 1100);
  return (
    <div className="win-reward-w-outer">
      <div className="win-reward-w-wrap">
        <div className="title">
          {/* Get rewards */}
          <img src={pic_txt3} alt="" />
        </div>
        <div className="tip">
          {/* Lucky player */}
           <img src={pic_txt4} alt="" />
        </div>
        <div className="reward">
          <img
            src={win_icon}
            alt=""
            className="icon animate__animated animate__fadeInRight"
          />
          <div className="pic-wrap">
            <img
              src={win_token}
              alt=""
              className="token animate__fadeInLeft animate__animated  duration-1s"
            />
            {visible ? (
              <div className="num animate__heartBeat animate__animated  duration-1s ">
                +{reward}
              </div>
            ) : null}
          </div>
        </div>

        <div className="btn-wrap">
          <span className="btn" onClick={onReward}>
            OK
          </span>
        </div>
      </div>
    </div>
  );
};
