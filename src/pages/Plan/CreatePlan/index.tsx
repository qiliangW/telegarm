import { type FC, useEffect, useState } from 'react';
import {
  Tabs,
  Input,
  Button,
  Picker,
  Field,
  DatetimePicker,
  Toast,
} from 'react-vant';
import { getProtocolList } from '@/api/protocol';
import { getConfig } from '@/api/config';
import { createPlan } from '@/api/plan';
import { useNavigate } from 'react-router-dom';
import { getConfigData } from '@/utils/config';
import { WarningO, Arrow, ArrowLeft } from '@react-vant/icons';
import { useLocation } from 'react-router-dom';
import './index.scss';
import dayjs from 'dayjs';
import { TopHeader } from '@/components/TopHeader/TopHeader';
let config: any = {};
export const CreatePlan = () => {
  const navigate = useNavigate(); //react-router-dom
  const location = useLocation();
  const { duration, protocol_id, layerData, param } = location.state || {}; // 解构获取参数

  const [protocolList, setProtocolList] = useState([]);
  const [layer, setLayer] = useState('');
  const [customize, setCustomize] = useState({
    amount: '',
    duration: '',
  });

  const [extra, setExtra] = useState({
    protocol_id: '',
    param: '',
  });
  const [planTime, setPlanTime] = useState(new Date());
  const columns = [
    { text: 'L4', value: 1 },
    { text: 'L7', value: 2 },
  ];

  const setParamById = (id: any) => {
    const param: any = protocolList.find((item: any) => item.ID == id);
    if (!param) return;
    setExtra((prev) => ({
      ...prev,
      param: JSON.stringify(param.param),
    }));
  };

  // useEffect(() => {
  //   setParamById();
  // }, [extra.protocol_id]);

  useEffect(() => {
    _getProtocolList();
  }, [layer]);

  useEffect(() => {
    if (protocol_id) {
      setExtra((prev) => ({
        ...prev,
        protocol_id: String(protocol_id),
      }));
    }
    if (layerData) {
      setLayer(Number(layerData));
    }
    if (duration) {
      setCustomize((prev) => ({
        ...prev,
        duration,
      }));
    }
    if (param) {
      setExtra((prev) => ({
        ...prev,
        param: JSON.stringify(param),
      }));
    }
  }, []);
  const _getProtocolList = () => {
    getProtocolList({ page: 1, pageSize: 100, layer: String(layer) }).then(
      (res: any) => {
        const list = res.list.map((item: any) => ({
          ...item,
          ID: item.ID.toString(),
        }));
        setProtocolList(list || []);
      }
    );
  };
  const _createPlan = async () => {
    try {
      await createPlan({
        execTime: planTime,
        param: JSON.parse(extra.param),
        protocol_id: Number(extra.protocol_id),
        duration: Number(customize.duration),
      });
      navigate(-1);
    } catch (e) {
      Toast.fail(e);
      console.log(e);
    }
  };
  const changeProtocol = (val: any) => {
    console.log(val);
    setExtra((prev) => ({ ...prev, protocol_id: val }));
    setParamById(val);
  };
  return (
    <div className="plan-box-wrap">
      <TopHeader title="新增计划" showBack></TopHeader>
      <div className="plan-box">
        <div className="new-order-box-item">
          {/* <div className="new-order-title">计划类型</div> */}
          <div className="order-duration-box" style={{ width: '100%' }}>
            <Picker
              popup={{
                round: true,
              }}
              value={layer}
              columns={columns}
              columnsFieldNames={{
                text: 'text', // 显示的字段
                value: 'value', // 对应的值字段
              }}
              onConfirm={(val: any) => {
                console.log(val, 'hjhjjh');
                setLayer(val);
              }}
            >
              {(val: any, _, actions) => {
                return (
                  <Field
                    readOnly
                    align="right"
                    rightIcon={<Arrow />}
                    clickable
                    label="计划类型"
                    value={
                      columns.find((item: any) => item.value === val)?.text ||
                      ''
                    }
                    placeholder="请选择计划类型"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </Picker>
          </div>
          {/* <div className="order-duration-box">
            <Input
              align="right"
              value={config.testDuration}
              type="number"
              disabled
            />
          </div> */}
        </div>
        <div className="new-order-box-item">
          <div className="order-duration-box" style={{ width: '100%' }}>
            <Picker
              value={extra.protocol_id}
              popup={{
                round: true,
              }}
              columnsFieldNames={{
                text: 'name',
                value: 'ID',
                children: 'children',
              }}
              columns={protocolList}
              onConfirm={changeProtocol}
            >
              {(val: any, _: any, actions) => {
                return (
                  <Field
                    readOnly
                    align="right"
                    rightIcon={<Arrow />}
                    clickable
                    label="计划协议"
                    value={_?.name || ''}
                    placeholder="请选择计划协议"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </Picker>
          </div>
        </div>
        <div className="new-order-box-item">
          <div className="new-order-title">计划参数</div>
          <div className="order-duration-box">
            <Input
              align="right"
              value={extra.param}
              onChange={(val) => {
                setExtra((prev) => ({
                  ...prev,
                  param: val,
                }));
              }}
            />
            {/* <span className="order-duration-icon">
                <ClockO fontSize={'16px'} />
              </span> */}
          </div>
        </div>

        <div className="new-order-box-item">
          <div className="new-order-title">计划时长</div>
          <div className="order-duration-box">
            <Input
              align="right"
              type="number"
              value={customize.duration}
              onChange={(val: any) =>
                setCustomize((prev) => ({ ...prev, duration: val }))
              }
              placeholder="请输入"
            />
          </div>
        </div>
        <div className="new-order-box-item">
          <div className="new-order-title">计划时间</div>
          <div className="order-duration-box">
            <DatetimePicker
              popup={{
                round: true,
              }}
              type="datetime"
              title="选择时间"
              onConfirm={(time: any) => {
                console.log(time, 'jhjhhjhjhhhhjhj');
                setPlanTime(time); // 更新 planTime
              }}
              value={planTime ? new Date(planTime) : new Date()} // 确保value是Date对象
            >
              {(val: any, _, actions) => {
                const displayValue = val
                  ? `${val.getFullYear()}-${(val.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}-${val
                      .getDate()
                      .toString()
                      .padStart(2, '0')} ${val
                      .getHours()
                      .toString()
                      .padStart(2, '0')}:${val
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}`
                  : '';

                return (
                  <Field
                    readOnly
                    clickable
                    rightIcon={<Arrow />}
                    align="right"
                    value={displayValue}
                    placeholder="请选择时间"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </DatetimePicker>
          </div>
        </div>
      </div>

      <div className="confirm-btn" onClick={_createPlan}>
        {/* <Divider /> */}
        <Button color="#00D676" block round size="large">
          确定
        </Button>
      </div>
    </div>
  );
};
