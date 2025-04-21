import { type FC, useEffect, useState } from 'react';
import {
  Tabs,
  Input,
  Button,
  Divider,
  Cell,
  Picker,
  Form,
  Field,
  Switch,
} from 'react-vant';
import { ClockO, WarningO, Arrow } from '@react-vant/icons';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { getProtocolList } from '@/api/protocol';
import { addWork, updateWork } from '@/api/way';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.scss';
export const AddWay = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { wayObj, Id } = location.state || {}; // 解构获取传递的对象
  const [addway, setAddway] = useState({
    name: '',
    secret: '',
    on: '2',
    protocolId: '',
    layer: '',
    webhook: '',
  });
  const [protocolList, setProtocolList] = useState([]);
  const columns = [
    { text: 'L4', value: 1 },
    { text: 'L7', value: 2 },
  ];
  // const setParamById = () => {
  //   const param: any = protocolList.find(
  //     (item: any) => item.ID == addway.protocolId
  //   );
  //   if (!param) return;
  //   setAddway((prev) => ({
  //     ...prev,
  //     param: JSON.stringify(param.param),
  //   }));
  // };
  // useEffect(() => {
  //   // setParamById();
  // }, [addway.protocolId]);
  useEffect(() => {
    if (wayObj) {
      console.log(wayObj);
      setAddway(wayObj);
    }
  }, []);
  const _getProtocolList = () => {
    getProtocolList({ page: 1, pageSize: 100, layer: addway.layer }).then(
      (res: any) => {
        const list = res.list.map((item: any) => ({
          ...item,
          ID: item.ID.toString(),
        }));
        setProtocolList(list || []);
      }
    );
  };
  const _addway = async () => {
    if (wayObj && !wayObj.add) {
      await updateWork({
        ...addway,
        protocolId: Number(addway.protocolId),
        ID: Id,
      });
      navigator(-1);

      return;
    }
    try {
      await addWork({
        ...addway,
        protocolId: Number(addway.protocolId),
      });
      navigator(-1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    _getProtocolList();
  }, [addway.layer]);
  return (
    <div className="order-box-wrap">
      <TopHeader title="新增方式" showBack={true}></TopHeader>
      <div className="way__content">
        <div className="new-order-box-item">
          <div className="new-order-title">名称</div>
          <div className="order-duration-box">
            <Input
              align="right"
              value={addway.name}
              onChange={(val: string) =>
                setAddway((prev) => ({
                  ...prev,
                  name: val,
                }))
              }
              placeholder="请录入"
            />
          </div>
        </div>
        <div className="new-order-box-item">
          <div className="order-duration-box" style={{ width: '100%' }}>
            <Picker
              popup={{
                round: true,
              }}
              value={addway.layer}
              columnsFieldNames={{
                text: 'text', // 显示的字段
                value: 'value', // 对应的值字段
              }}
              columns={columns}
              onConfirm={(val: any) => {
                setAddway((prev) => ({
                  ...prev,
                  layer: val,
                }));
              }}
            >
              {(val: any, _, actions) => {
                return (
                  <Field
                    readOnly
                    align="right"
                    rightIcon={<Arrow />}
                    clickable
                    label="类型"
                    value={
                      columns.find((item: any) => item.value === val)?.text ||
                      ''
                    }
                    placeholder="请选择"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </Picker>
          </div>
        </div>
        {/* <div className="new-order-box-item">
          <div className="new-order-title">订单金额(U)</div>
          <div className="order-duration-box">
            <Input
              align="right"
              value={orderDuration}
              type="number"
              onChange={(num: any) => setOrderDuration(num)}
              placeholder="请输入金额"
            />
          </div>
        </div> */}
        <div className="new-order-box-item">
          <div className="order-duration-box" style={{ width: '100%' }}>
            <Picker
              value={addway.protocolId}
              popup={{
                round: true,
              }}
              columnsFieldNames={{
                text: 'name',
                value: 'ID',
                children: 'children',
              }}
              columns={protocolList}
              onConfirm={(val: any) => {
                setAddway((prev) => ({ ...prev, protocolId: val }));
              }}
            >
              {(val: any, _, actions) => {
                return (
                  <Field
                    readOnly
                    align="right"
                    rightIcon={<Arrow />}
                    clickable
                    label="协议"
                    value={_?.name || ''}
                    placeholder="请选择"
                    onClick={() => actions.open()}
                  />
                );
              }}
            </Picker>
          </div>
        </div>
        {/* <div className="new-order-box-item">
          <div className="new-order-title">参数</div>
          <div className="order-duration-box">
            <Input
              align="right"
              value={addway.param}
              onChange={(param) =>
                setAddway((prev) => ({
                  ...prev,
                  param,
                }))
              }
              placeholder="请输入"
            />
          </div>
        </div> */}
        <div className="new-order-box-item">
          <div className="new-order-title">回调地址</div>
          <div className="order-duration-box">
            <Input
              align="right"
              value={addway.webhook}
              onChange={(webhook) =>
                setAddway((prev) => ({
                  ...prev,
                  webhook,
                }))
              }
              placeholder="请输入"
            />
          </div>
        </div>
        <div className="new-order-box-item">
          <div className="new-order-title">密钥</div>
          <div className="order-duration-box">
            <Input
              align="right"
              value={addway.secret}
              onChange={(secret: any) =>
                setAddway((prev) => ({
                  ...prev,
                  secret,
                }))
              }
              placeholder="请输入"
            />
          </div>
        </div>
        <div className="new-order-box-item">
          <div className="new-order-title">是否关闭</div>
          <div className="order-duration-box">
            <Switch
              checked={addway.on === '1' ? true : false}
              size={20}
              activeColor="#0C9560"
              inactiveColor="#141522"
              onChange={(val) =>
                setAddway((prev) => ({
                  ...prev,
                  on: val ? '1' : '2',
                }))
              }
            ></Switch>
          </div>
        </div>
      </div>

      <div className="confirm-btn" onClick={_addway}>
        {/* <Divider /> */}
        <Button color="#00D676" block round size="large">
          确定
        </Button>
      </div>
    </div>
  );
};
