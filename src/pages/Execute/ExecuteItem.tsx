import { type FC, useEffect, useState } from 'react';
import { Button } from 'react-vant';
import './ExecuteItem.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
export default function ExecuteItem(props: any) {
  const navigate = useNavigate();
  const layerMap: any = {
    1: 'L4',
    2: 'L7',
  };
  const statusMap: any = {
    1: '待执行',
    4: '已执行',
    3: '执行中',
    2: '已取消',
  };
  const getEffect = () => {
    if (!props?.plan?.execNum) return;
    navigate('/effectiveness', {
      state: {
        execNum: props.plan?.execNum,
      },
    });
  };
  return (
    <div className="order-box-item">
      <div className="order-title">
        <span>{dayjs(props.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        <span>{statusMap[props.status]}</span>
      </div>
      <div className="order-content">
        <p className="order-content-item">
          <span>执行编号：</span>
          <span>{props?.num || ''}</span>
        </p>
        <p className="order-content-item">
          <span>执行类型：</span>
          <span>{layerMap[props.plan.protocol.layer]}</span>
        </p>
        <p className="order-content-item">
          <span>执行协议：</span>
          <span>{props.plan.protocol.name}</span>
        </p>
        <p className="order-content-item">
          <span>执行参数：</span>
          <span>{JSON.stringify(props.plan.protocol.param)}</span>
        </p>
        <p className="order-content-item">
          <span>执行时长：</span>
          <span>{props.plan.duration} 小时</span>
        </p>
        <p className="order-content-item">
          <span>执行时间：</span>
          <span>
            {dayjs(props.plan.execTime).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </p>
        <p className="order-content-item">
          <span>执行效果：</span>
          <span
            className={`effect-link ${!props?.plan?.execNum ? 'disabled' : ''}`}
            onClick={getEffect}
          >
            执行效果图
          </span>
        </p>
      </div>
      {/* <div className="order-oprate-btn">
        <span className="order-btn-text">再次计划</span>
      </div> */}
    </div>
  );
}
