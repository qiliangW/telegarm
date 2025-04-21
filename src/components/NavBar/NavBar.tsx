import { useNavigate } from 'react-router-dom';

import './NavBar.scss';
import icon_back from '@/assets/imgs/icon-back.png'

export const NavBar=() => {
    const navigate = useNavigate();//react-router-dom
    let goBack=()=>{
        navigate(-1)
    }

  return (
   <div className="navbar-n-wrap">
        <span className="icon-back-wrap" onClick={ ()=> goBack() }>
            <img src={icon_back} alt="" className='icon-back'/>
        </span>
   </div>
  )
};
