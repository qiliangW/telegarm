import React, { useEffect, useState } from 'react';
import './TopHeader.scss';
import { Plus } from '@react-vant/icons';
import backIcon from '@/assets/imgs/back_icon.png';
import { useNavigate, useLocation } from 'react-router-dom';
export const TopHeader = React.memo(
  ({ title, showBtn, bgColor, btnText, showBack }: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const _navigateTo = () => {
      if (location.pathname === '/home/orders') {
        navigate('/createOrder');
      } else if (location.pathname === '/home/plan') {
        navigate('/createPlan');
      } else if (location.pathname === '/home/way') {
        navigate('/addway');
      }
    };
    const _back = () => {
      navigate(-1);
    };
    useEffect(() => {
      // 拿到路由的title怎么拿呢
    }, []);
    return (
      <div
        className="page-title"
        style={{ backgroundColor: bgColor ? bgColor : '' }}
      >
        <p>{title}</p>
        {showBack ? (
          <span className="back-icon" onClick={_back}>
            <img
              src={backIcon}
              alt=""
              style={{ width: '25px', height: '20px' }}
            />
          </span>
        ) : null}
        {showBtn ? (
          <span className="plus-btn">
            <Plus onClick={_navigateTo} fontSize={'20px'} />
          </span>
        ) : // <Button
        //   icon={}
        //   round
        //   size="mini"
        //   className="add-order-btn"
        //   color="rgba(53,66,99,1)"
        //   onClick={_navigateTo}
        // >
        //   {btnText}
        // </Button>
        null}
      </div>
    );
  }
);
