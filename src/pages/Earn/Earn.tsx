import { type FC, useEffect, useContext, useState } from 'react';
// import toast from '@/components/Toast/Toast';

import './Earn.scss';

// import banner from '@/assets/imgs/earn/banner.png';
// import icon_tip_sucess from '@/assets/imgs/icon-tip-sucess.png';
// import icon_energy from '@/assets/imgs/icon-energy.png';
// import icon_token from '@/assets/imgs/icon-token.png';

import { Progress } from '@/components/Progress/Progress';
import { SignItems } from './components/SignItems/SignItems';
import { Tasks } from './components/Tasks/Tasks';
import { sign, getSignList } from '@/api/task';
import useStore from '@/strore';
import {
  AppRoot,
  Modal,
  Button,
  Placeholder,
  ModalClose,
  ModalHeader,
} from '@telegram-apps/telegram-ui';

export const Earn: FC = () => {
  const [accumulationEnergy, setAccumulationEnergy] = useState(0);
  const setUseEnergy = useStore((state: any) => state.setUseEnergy);
  const setEdenToken = useStore((state: any) => state.setEdenToken);
  const [todaySignFlag, setTodaySignFlag] = useState(0);
  const [signList, setSignList] = useState([]);
  const [signedDays, setSignedDays] = useState(0);
  const [signProgress, setSignProgress] = useState(0);
  let bindSign = async () => {
    if (todaySignFlag) return;
    //签到
    const signItem: any = getSignItem();
    await sign({ id: signItem.id });
    if (signItem.continuous === 7) {
      // signSuccessTip(signItem.signinTokenReward, 'token');
      setTimeout(() => {
        signTips(signItem.signinTokenReward, signItem.signinPointReward);
        setUseEnergy();
      });
    } else {
      // signSuccessTip(signItem.signinPointReward, 'energy');
    }
    setUseEnergy();
    setEdenToken();
    _getSignList();
  };
  //// 计算签到进度百分比
  const calculateProgress = (list: any) => {
    const signedDays = list.filter((signed: any) => signed.signFlag).length;
    setSignedDays(signedDays);
    if (signedDays === 1) return (signedDays / list.length) * 100 - 2;
    return (signedDays / list.length) * 100;
  };
  const _getSignList = async () => {
    getSignList({}).then(async (res: any) => {
      setSignList(res.list || []);
      setTodaySignFlag(res.todaySignFlag);
      setSignProgress(calculateProgress(res.list));
      getAccumulationEnergy(res.list);
    });
  };

  const getAccumulationEnergy = (list: any) => {
    //获取能量
    let unsignItem: any = null;
    list.some((item: any) => {
      if (!item.signFlag) {
        unsignItem = item;
        return true;
      }
      return false;
    });

    setAccumulationEnergy(
      unsignItem.continuous === 7
        ? unsignItem.signinTokenReward
        : unsignItem?.signinPointReward
    );
  };

  useEffect(() => {
    _getSignList();
  }, []);

  const getSignItem = () => {
    //获取签到id
    let signItem = null;
    signList.some((item: any) => {
      if (!item.signFlag) {
        signItem = item;
        return true;
      }
      return false;
    });
    return signItem;
  };

  // let signSuccessTip = (num, type, all = false) => {
  //   //签到成功提示
  //   let message = (
  //     <div className="toast-t-sign-suc-outer">
  //       <div className="toast-t-wrap toast-t-sign-wrap">
  //         <img src={icon_tip_sucess} alt="" />
  //         <div className="txt">Complete the task!</div>
  //       </div>
  //       <div className="energy">
  //         <img src={type === 'token' ? icon_token : icon_energy} alt="" />
  //         <span>+{num}</span>
  //       </div>
  //     </div>
  //   );
  //   toast(message);
  //   // setTimeout(()=>{
  //   //   toast(message)
  //   // }, 2000)
  // };
  const signTips = (token: any, energy: any) => {
    // let message = (
    //   <div className="toast-t-sign-suc-outer">
    //     <div className="toast-t-wrap toast-t-sign-wrap">
    //       <img src={icon_tip_sucess} alt="" />
    //       <div className="txt">Complete the task!</div>
    //     </div>
    //     <div className="energy">
    //       <img src={icon_token} alt="" />
    //       <span>+{token}</span>
    //     </div>
    //     <div className="energy" style={{ paddingTop: '10rem' }}>
    //       <img src={icon_energy} alt="" />
    //       <span>+{energy}</span>
    //     </div>
    //   </div>
    // );
    // toast(message);
  };
  const close = () => {
    //setOpen(false);
  };
  const change = (val) => {
    if (!val) {
      //setOpen(false);
    }
  };

  return null;
  // <div className="earn-page-wrap">
  //   {/* <TopHeader/> */}

  //   <div className="banner-wrap">
  //     <img src={banner} alt="" />
  //   </div>

  //   {/* 签到 */}
  //   <div className="sign-outer">
  //     <Progress
  //       percent={
  //         signProgress >= 99
  //           ? '100%'
  //           : signProgress == 0
  //           ? '0%'
  //           : signProgress - 1 + '%'
  //       }
  //     >
  //       {/* 小图标定位：left值最大不能超过95%  */}
  //       {signProgress >= 100 ? null : (
  //         <div
  //           className="progress-d-num-wrap"
  //           style={{
  //             left:
  //               (signProgress >= 93
  //                 ? 93
  //                 : signedDays === 1
  //                 ? signProgress + 8
  //                 : signProgress + 7) + '%',
  //           }}
  //         >
  //           +{accumulationEnergy}
  //         </div>
  //       )}
  //     </Progress>
  //     <SignItems signList={signList} />
  //     <div className="sign-btn-wrap">
  //       <span
  //         className={`sign-btn ${!todaySignFlag ? '' : 'disabled'}`}
  //         onClick={bindSign}
  //       >
  //         Sign in
  //       </span>
  //     </div>

  //     {/* 任务 */}
  //     <div className="tasks-outer">
  //       <div className="task-title">Task</div>
  //       <Tasks />
  //     </div>
  //   </div>

  //   {/* <Modal
  //     open={open}
  //     onOpenChange={change}
  //     header={
  //       <div
  //         style={{
  //           display: 'flex',
  //           justifyContent: 'flex-end',
  //           fontSize: '20rem',
  //         }}
  //       >
  //         <span onClick={close}>x</span>
  //       </div>
  //     }
  //     style={{
  //       zIndex: 9999999,
  //       background: 'white',
  //       border: '2px solid red',
  //     }}
  //   >
  //     <div style={{ height: '400px' }}>222</div>
  //   </Modal> */}
  // </div>
};
