
import { useNavigate } from 'react-router-dom';

import './Invite.scss';

import icon_invite from '@/assets/imgs/play/icon-invite.png'
import icon_rank from '@/assets/imgs/play/icon-rank.png'


export const Invite=() => {
  const navigate = useNavigate();//react-router-dom
   let toInviteRecords =()=>{
        navigate('/home/invite')
   }

  return (
    <div className='c-invite-wrap'>
       <div className="l" onClick={toInviteRecords}>
            <img src={icon_invite} alt="" />
            <div className="txt">Invite friends to get more <br />
EDEN coins !</div>
       </div>
       <div className="r">
        <img src={icon_rank} alt="" />
        <div className="txt">Ranking</div>
       </div>
    </div>
  )
};
