import './TaskItem.scss';

// import icon_token from '@/assets/imgs/icon-token.png';
// import task_done from '@/assets/imgs/earn/task-done.png';
// import icon_energy from '@/assets/imgs/icon-energy.png';
// import { Spinner } from '@telegram-apps/telegram-ui';
export const TaskItem = (props: any) => {
  const handleGetTask = () => {
    if (!props.status) {
      props._getTask(props);
    }
  };
  return null;
  // <div className="e-task-item-wrap" onClick={handleGetTask}>
  //   <div className="l">
  //     <div className="title">{props.taskDetail}</div>
  //     <div className="token-wrap">
  //       <img src={props.taskType === 7 ? icon_energy : icon_token} alt="" />
  //       <span className="token">
  //         +{Number(props.taskToken) ? props.taskToken : props.taskPoint}
  //       </span>
  //     </div>
  //   </div>
  //   <div className="btn-wrap">
  //     {props.taskType === 7 ? (
  //       !props.status ? (
  //         <span className="txt">
  //           {props.playCount}
  //           <span>/{props.taskNum}</span>
  //         </span>
  //       ) : (
  //         <img src={task_done} alt="" />
  //       )
  //     ) : !props.status ? (
  //       <span className="btn">
  //         {!props?.loading ? 'Award' : <Spinner size="s"></Spinner>}
  //       </span>
  //     ) : (
  //       <img src={task_done} alt="" />
  //     )}
  //   </div>
  // </div>
};
