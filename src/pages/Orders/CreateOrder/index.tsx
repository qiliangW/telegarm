import { type FC, useEffect, useState } from 'react';
import { Tabs, Input, Button, Picker, Field } from 'react-vant';
import { getProtocolList } from '@/api/protocol';
import { getConfig } from '@/api/config';
import { createOrder } from '@/api/order';
import { useNavigate } from 'react-router-dom';
import { getConfigData } from '@/utils/config';
import { WarningO, Arrow, ArrowLeft } from '@react-vant/icons';
import { useLocation } from 'react-router-dom';
import './index.scss';
import { TopHeader } from '@/components/TopHeader/TopHeader';

let config: any = {};
export const CreateOrder = () => {
  const navigate = useNavigate(); //react-router-dom
  const location = useLocation();
  const { duration, protocol_id, param } = location.state || {}; // 解构获取参数
  const [activeTab, setActiveTab] = useState(1);
  const [protocolList, setProtocolList] = useState([]);
  const [customize, setCustomize] = useState({
    amount: '',
    duration: '',
  });

  const [extra, setExtra] = useState({
    protocol_id: '',
    param: '',
  });
  const columns = ['L4'];
  const getDuration = () => {
    if (!protocol_id) {
      // 说明是自定义
      setCustomize((prev) => ({
        ...prev,
        duration,
        amount: (duration * config.price || '').toString(),
      }));
    } else {
      setActiveTab(2);
    }
  };
  const setParamById = (id: any) => {
    const param: any = protocolList.find((item: any) => item.ID == id);
    console.log(param, 'paramparam');
    if (!param) return;
    setExtra((prev) => ({
      ...prev,
      param: JSON.stringify(param.param),
    }));
  };

  // useEffect(() => {
  //   if (param) return;
  //   setParamById();
  // }, [extra.protocol_id]);

  useEffect(() => {
    if (protocol_id) {
      setExtra((prev) => ({
        ...prev,
        protocol_id: String(protocol_id),
      }));
    }
    if (param) {
      console.log(22222);
      setExtra((prev) => ({
        ...prev,
        param: JSON.stringify(param),
      }));
    }
  }, []);

  useEffect(() => {
    getConfig().then((res) => {
      console.log(res);
      config = res || {};
      getDuration();
    });
    getProtocolList({ page: 1, pageSize: 100, layer: '1' }).then((res: any) => {
      const list = res.list.map((item: any) => ({
        ...item,
        ID: item.ID.toString(),
      }));
      const data = list.filter((item: any) => item.on === '1');
      setProtocolList(data || []);
    });
  }, []);

  const _back = () => {
    navigate(-1);
  };
  const changeProtocol = (val: any) => {
    setExtra((prev) => ({ ...prev, protocol_id: val }));
    setParamById(val);
  };
  const _createOrder = async () => {
    try {
      if (activeTab === 1) {
        await createOrder({
          duration: Number(customize.duration),
          amount: Number(customize.amount),
        });
      } else {
        await createOrder({
          duration: config.testDuration,
          amount: config.testPrice * config.testDuration,
          extra: {
            protocol_id: Number(extra.protocol_id),
            param: JSON.parse(extra.param),
          },
        });
      }

      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="order-box-wrap">
      <TopHeader title="新增订单" showBack></TopHeader>
      <Tabs
        active={activeTab}
        defaultActive={1}
        onChange={(tab) => setActiveTab(Number(tab))}
        background={'#222339'}
        sticky={true}
        offsetTop={'40px'}
      >
        <Tabs.TabPane title="自定义" name={1}>
          <div className="new-order-box-item">
            <div className="new-order-title">订单时长(小时)</div>
            <div className="order-duration-box">
              <Input
                align="right"
                value={customize.duration}
                type="number"
                onChange={(num: any) => {
                  console.log(num);
                  setCustomize((prev) => ({
                    ...prev,
                    duration: num,
                    amount: (num * config.price).toString(),
                  }));
                }}
                placeholder="请输入时长"
              />
              {/* <span className="order-duration-icon">
                <ClockO fontSize={'20px'} />
              </span> */}
            </div>
          </div>
          <div className="new-order-box-item">
            <div className="new-order-title">订单金额(U)</div>
            <div className="order-duration-box">
              <Input
                align="right"
                value={customize.amount}
                type="number"
                disabled
              />
            </div>
          </div>

          <div className="confirm-btn">
            {/* <Divider /> */}
            <Button color="#00D676" block round size="large">
              确定
            </Button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="测试包" name={2}>
          <div className="test-package">
            <span className="test-package-icon">
              <WarningO color="#a98420" fontSize={'20px'} />
            </span>
            <p>仅用于测试验证平台能力，且仅支持L4协议</p>
          </div>
          <div className="new-order-box-item">
            <div className="new-order-title">订单时长(小时)</div>
            <div className="order-duration-box">
              <Input
                align="right"
                value={config.testDuration}
                type="number"
                disabled
              />
              {/* <span className="order-duration-icon">
                <ClockO fontSize={'16px'} />
              </span> */}
            </div>
          </div>
          <div className="new-order-box-item">
            <div className="new-order-title">订单金额(U)</div>
            <div className="order-duration-box">
              <Input
                align="right"
                disabled
                value={(config.testPrice * config.testDuration).toString()}
                type="number"
              />
            </div>
          </div>
          <div className="new-order-box-item">
            <div className="order-duration-box" style={{ width: '100%' }}>
              <Picker
                popup={{
                  round: true,
                }}
                value={'L4'}
                columns={columns}
                onConfirm={(val) => {
                  // setExtra((prev) => ({ ...prev }));
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
                      value={val || ''}
                      placeholder="请选择计划类型"
                      onClick={() => actions.open()}
                    />
                  );
                }}
              </Picker>
            </div>
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
                // onConfirm={(val: any) => {
                //   // setExtra((prev) => ({ ...prev, protocol_id: val }));
                // }}
              >
                {(val: any, _: any, actions) => {
                  const selectedProtocol: any = protocolList.find(
                    (item: any) => item.ID == extra.protocol_id
                  );
                  return (
                    <Field
                      readOnly
                      align="right"
                      rightIcon={<Arrow />}
                      clickable
                      label="计划协议"
                      value={selectedProtocol?.name}
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
                onChange={(param: any) =>
                  setExtra((prev) => ({ ...prev, param }))
                }
                placeholder="请输入"
              />
            </div>
          </div>
          <div className="new-order-box-item">
            <div className="new-order-title">计划时长</div>
            <div className="order-duration-box">
              <Input
                align="right"
                value={config.testDuration}
                disabled
                type="number"
              />
            </div>
          </div>
          <div className="new-order-box-item">
            <div className="new-order-title">计划时间</div>
            <div className="order-duration-box">
              付款后立即执行
              {/* <DatetimePicker
                popup={{
                  round: true,
                }}
                type="datetime"
                title="选择时间"
                defaultValue={new Date()}
                onConfirm={(time: any) => {
                  //console.log(time.getTime(), 'hjhhj');
                  setExtra((prev) => ({
                    ...prev,
                    scheduledTime: time,
                  }));
                }}
                value={extra.scheduledTime}
              >
                {(val: any, _, actions) => {
                  return (
                    <Field
                      readOnly
                      clickable
                      rightIcon={<Arrow />}
                      align="right"
                      value={val?.toLocaleString()}
                      placeholder="请选择时间"
                      onClick={() => actions.open()}
                    />
                  );
                }}
              </DatetimePicker> */}
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
      <div className="confirm-btn" onClick={_createOrder}>
        {/* <Divider /> */}
        <Button color="#00D676" block round size="large">
          确定
        </Button>
      </div>
    </div>
  );
};
