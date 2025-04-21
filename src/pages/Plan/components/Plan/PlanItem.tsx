import { type FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getpingData } from '@/api/ping';
import { updatePlan } from '@/api/plan';
import { useNavigate } from 'react-router-dom';
import './PlanItem.scss';
export default function OrderItem(props: any) {
  const nanigate = useNavigate();
  const planStatusMap: any = {
    1: '待执行',
    3: '执行中',
    4: '已执行',
    2: '已取消',
    5: '未成功',
  };
  const layerMap: any = {
    1: 'L4',
    2: 'L7',
  };
  const _handleOprate = async (status: string) => {
    if (status === '再次计划') {
      nanigate('/createPlan', {
        state: {
          layerData: props.protocol.layer,
          on: props.protocol.on,
          duration: props.duration,
          param: props.protocol.param,
          protocol_id: props.protocol_id,
        },
      });
    }
    if (status === '取消计划') {
      try {
        await updatePlan({ ...props, status: '2' });
        props.onDelete && props.onDelete(props);
      } catch (e) {}
    }
  };
  const getBtnsByStatus = () => {
    const { status } = props;
    if (status == 1) {
      return (
        <>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('取消计划');
            }}
          >
            取消计划
          </span>
        </>
      );
    } else if (status == 2) {
      return (
        <>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('再次计划');
            }}
          >
            再次计划
          </span>
        </>
      );
    } else if (status == 3) {
      return null;
    } else if (status == 4) {
      return (
        <>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('再次计划');
            }}
          >
            再次计划
          </span>
        </>
      );
    } else if (status == 5) {
      return (
        <span
          className="order-btn-text"
          onClick={() => {
            _handleOprate('再次计划');
          }}
        >
          再次计划
        </span>
      );
    }
  };
  // useEffect(() => {
  //   getEffect();
  // }, []);
  const getEffect = () => {
    if (!props.execNum) return;
    nanigate('/effectiveness', {
      state: {
        execNum: props.execNum,
      },
    });
    // getpingData({});
  };
  return (
    <div className="order-box-item">
      <div className="order-title">
        <span>{dayjs(props.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        <span>{planStatusMap[props.status]}</span>
      </div>
      <div className="order-content">
        <p className="order-content-item">
          <span>计划编号</span>
          <span>{props.num}</span>
        </p>
        <p className="order-content-item">
          <span>计划类型：</span>
          <span>{layerMap[props.protocol.layer]}</span>
        </p>
        <p className="order-content-item">
          <span>计划协议：</span>
          <span>{props.protocol.name}</span>
        </p>
        <p className="order-content-item">
          <span>计划参数：</span>
          <span>{JSON.stringify(props.protocol.param)}</span>
        </p>
        <p className="order-content-item">
          <span>计划时长：</span>
          <span>{props.duration} 小时</span>
        </p>
        <p className="order-content-item">
          <span>完成时间：</span>
          <span>
            {props.completetime
              ? dayjs(props.completetime).format('YYYY-MM-DD HH:mm:ss')
              : '--'}
          </span>
        </p>
        <p className="order-content-item">
          <span>计划效果：</span>
          <span
            className={`effect-link ${!props.execNum ? 'disabled' : ''}`}
            onClick={getEffect}
          >
            <span>执行效果图</span>
          </span>
        </p>
      </div>
      <div className="order-oprate-btn">{getBtnsByStatus()}</div>
    </div>
  );
}
