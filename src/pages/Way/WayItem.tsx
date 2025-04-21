import { type FC, useEffect, useState } from 'react';
import { Switch } from 'react-vant';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import './Way.scss';
export default function OrderItem(props: any) {
  const { name, on, onSwitchChange, webhook, protocolId, secret, ID } = props;
  const { layer, param } = props.protocol;
  const navigate = useNavigate();
  const checked = on === '1' ? true : false;
  const layerMap: any = {
    1: 'L4',
    2: 'L7',
  };
  const changeSwitch = (val: boolean) => {
    onSwitchChange(val ? '1' : '2', props);
  };
  const _editWay = () => {
    navigate('/addway', {
      state: {
        wayObj: {
          add: false,
          name,
          on,
          layer: Number(layer),
          webhook,
          param,
          secret,
          protocolId: String(protocolId),
        },
        Id: ID,
      },
    });
  };
  const _copyWay = () => {
    navigate('/addway', {
      state: {
        wayObj: {
          add: true,
          name,
          on,
          layer: Number(layer),
          webhook,
          param,
          secret,
          protocolId: String(protocolId),
        },
        Id: ID,
      },
    });
  };
  return (
    <div className="order-box-item">
      <div className="order-title">
        <span>{dayjs(props.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        <Switch
          checked={checked}
          size={20}
          onChange={changeSwitch}
          activeColor="#0C9560"
          inactiveColor="#141522"
        ></Switch>
      </div>
      <div className="order-content">
        <p className="order-content-item">
          <span>名称：</span>
          <span>{props.name}</span>
        </p>
        {/* <p className="order-content-item">
          <span>编号：</span>
          <span>{props.ID}</span>
        </p> */}
        <p className="order-content-item">
          <span>类型：</span>
          <span>{layerMap[props.protocol.layer]}</span>
        </p>
        <p className="order-content-item">
          <span>协议：</span>
          <span>{props.protocol.name}</span>
        </p>
        <p className="order-content-item">
          <span>参数：</span>
          <span>{JSON.stringify(props.protocol.param)}</span>
        </p>
        <p className="order-content-item">
          <span>回调地址：</span>
          <span>{props.webhook}</span>
        </p>
        <p className="order-content-item">
          <span>密钥：</span>
          <span>{props.secret}</span>
        </p>
      </div>
      <div className="order-oprate-btn">
        <span className="order-btn-text edit" onClick={_editWay}>
          编辑
        </span>
        <span className="order-btn-text" onClick={_copyWay}>
          复制
        </span>
      </div>
    </div>
  );
}
