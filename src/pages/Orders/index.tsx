import { type FC, useEffect, useState } from 'react';
import { Tabs, List } from 'react-vant';
import OrderItem from './components/OrderItem';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { replace, useNavigate } from 'react-router-dom';
import { getOrderList, createOrder, updateOrder } from '@/api/order';
import { initUtils } from '@telegram-apps/sdk';
import './index.scss';
export const Orders = () => {
  const navigate = useNavigate(); //react-router-dom
  const [activeTab, setActiveTab] = useState(0);
  const [pageSize] = useState(5); // 每页加载的数量
  const [tabData, setTabData] = useState<any>({}); // 存储每个标签页的状态
  const utils = initUtils();
  // const orderList = [
  //   {
  //     id: 0,
  //     name: '全部',
  //   },
  //   {
  //     id: 1,
  //     name: '待支付',
  //   },
  //   {
  //     id: 3,
  //     name: '已超时',
  //   },
  //   {
  //     id: 2,
  //     name: '已支付',
  //   },
  //   {
  //     id: 5,
  //     name: '已取消',
  //   },
  // ];

  const updateOrderInTab = (orderId: number, updatedData: any) => {
    setTabData((prev: any) => {
      const currentTab = prev[activeTab];
      if (!currentTab) return prev;

      // 更新订单列表
      const updatedOrders = currentTab.orders.map((order: any) =>
        order.ID === orderId ? { ...order, ...updatedData } : order
      );

      return {
        ...prev,
        [activeTab]: {
          ...currentTab,
          orders: updatedOrders,
        },
      };
    });
  };

  const cancelOrder = async (order: any) => {
    console.log(order);
    const updatedData = { ...order, status: '5' };
    try {
      await updateOrder(updatedData);
      updateOrderInTab(order.ID, updatedData);
    } catch (e) {
      console.log(e);
    }
  };
  const pay = (order: any) => {
    utils.openLink(order.pay_url);
  };
  const _createOrder = (order: any) => {
    navigate('/createOrder', {
      state: {
        duration: order.duration,
        protocol_id: order?.extra?.protocol_id || '',
        param: order?.extra?.param ?? null,
      },
    });
  };
  const operateMapFns: any = {
    取消订单: cancelOrder,
    立即付款: pay,
    待付款: pay,
    再次购买: _createOrder,
  };

  useEffect(() => {
    console.log('INIT');

    //  console.log(tabData, 'changeTabchangeTab');
  }, []);
  const onLoad = async () => {
    const currentTab = tabData[activeTab];
    if (!currentTab) return;
    const { page, orders } = currentTab;
    const res: any = await getOrderList({
      page,
      pageSize,
      status: activeTab ? activeTab : '',
    });
    const newOrders = res?.list || [];

    setTabData((prev: any) => ({
      ...prev,
      [activeTab]: {
        orders: [...orders, ...newOrders],
        page: page + 1,
        finished: newOrders.length < pageSize, // 如果返回的数据少于 pageSize，说明没有更多数据了
      },
    }));
    // setLoading(false);
  };
  useEffect(() => {
    // const initialData: any = {};
    // orderList.forEach((tab) => {
    //   initialData[tab.id] = {
    //     page: 1,
    //     finished: false,
    //     orders: [],
    //   };
    // });
    // setTabData(initialData);
  }, []);
  const changeTab = (tab: any) => {
    console.log(tab);
    setActiveTab(tab); // 更新当前激活的 Tab
    setTabData((prev: any) => ({
      ...prev,
      [tab]: {
        page: 1, // 重置分页
        finished: false, // 重置加载完成状态
        orders: [], // 清空当前 Tab 的订单数据
      },
    }));
  };
  const handleOprateOrder = (item: any, status: any) => {
    // 操作订单
    operateMapFns[status](item);
  };
  return (
    <div className="order-box">
      <TopHeader title="价格" />
      <OrderItem />
      <OrderItem />

      {/* <Tabs
        active={activeTab}
        defaultActive={1}
        onChange={changeTab}
        background={'#222339'}
        sticky={true}
        offsetTop={'40px'}
      >
        {orderList.map((item) => (
          <Tabs.TabPane key={item.id} title={item.name} name={item.id}>
            <div className="order-items">
              {item.id === activeTab ? (
                <List
                  finished={tabData[item.id]?.finished}
                  onLoad={onLoad}
                  finishedText="没有更多数据了"
                >
                  {tabData[item.id]?.orders.map((order: any, index: number) => (
                    <OrderItem
                      key={index}
                      {...order}
                      onOprateOrder={handleOprateOrder}
                    />
                  ))}
                </List>
              ) : null}
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs> */}
    </div>
  );
};
