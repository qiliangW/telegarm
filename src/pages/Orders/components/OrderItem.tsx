import { type FC, useEffect, useState } from 'react';
import { Toast } from 'react-vant';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './OrderItem.scss';
import dayjs from 'dayjs';
export default function OrderItem(props: any) {
  const _handleOprate = (text: string) => {
    props.onOprateOrder && props.onOprateOrder(props, text);
  };
  const orderStatusMap: any = {
    1: '待支付',
    2: '已支付',
    3: '已超时',
    5: '已取消',
    4: '已失败',
  };
  const statusClassMap: any = {
    1: 'status-pending', // 待付款
    2: 'status-confirmed', // 已支付
    3: 'status-cancelled', // 待确认
    4: 'status-cancelled', // 已确认
    5: 'status-cancelled',
  };
  const copy = () => {
    Toast('复制成功');
  };
  const renderCopyIcon = () => {
    return (
      <CopyToClipboard text={props.hash}>
        <i
          style={{ width: '14px', height: '14px', marginTop: '-8px' }}
          onClick={copy}
        >
          <svg
            data-v-d2e47025=""
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64z"
            ></path>
            <path
              fill="currentColor"
              d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64"
            ></path>
          </svg>
        </i>
      </CopyToClipboard>
    );
  };
  const getBtnsByStatus = () => {
    const { status } = props;
    console.log(status, 'jhhjhj');
    if (status == 1) {
      return (
        <>
          <span
            className="order-btn-text cancel"
            onClick={() => {
              _handleOprate('取消订单');
            }}
          >
            取消订单
          </span>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('立即付款');
            }}
          >
            立即付款
          </span>
        </>
      );
    } else if (status == 2) {
      return (
        <>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('再次购买');
            }}
          >
            再次购买
          </span>
        </>
      );
    } else if (status == 3) {
      return (
        <>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('再次购买');
            }}
          >
            再次购买
          </span>
        </>
      );
    } else if (status == 4) {
      return (
        <>
          <span
            className="order-btn-text"
            onClick={() => {
              _handleOprate('再次购买');
            }}
          >
            再次购买
          </span>
        </>
      );
    } else if (status == 5) {
      return (
        <span
          className="order-btn-text"
          onClick={() => {
            _handleOprate('再次购买');
          }}
        >
          再次购买
        </span>
      );
    }
  };
  return (
    <div className="order-box-item">
      <div className="order-title">
        <span>{dayjs(props.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        <span className={statusClassMap[props.status]}>
          {orderStatusMap[props.status]}
        </span>
      </div>
      <div className="order-content">
        <p className="order-content-item">
          <span>订单编号</span>
          <span>{props.num}</span>
        </p>
        <p className="order-content-item">
          <span>订单时长：</span>
          <span>{props.duration} 小时</span>
        </p>
        <p className="order-content-item">
          <span>订单金额：</span>
          <span>{props.amount} U</span>
        </p>
        <p className="order-content-item">
          <span>支付金额：</span>
          <span>{props.payAmount} U</span>
        </p>
        {/* <p className="order-content-item">
          <span>交易哈希：</span>
          <span>
            {props.hash
              ? `${props.hash.substring(0, 6)}...${props.hash.substring(
                  props.hash.length - 6
                )}`
              : ''}
          </span>
          {renderCopyIcon()}
        </p> */}
        <p className="order-content-item">
          <span>完成时间：</span>
          <span>
            {props.completionTime
              ? dayjs(props.completionTime).format('YYYY-MM-DD HH:mm:ss')
              : ''}
          </span>
        </p>
      </div>
      <div className="order-oprate-btn">{getBtnsByStatus()}</div>
    </div>
  );
}
