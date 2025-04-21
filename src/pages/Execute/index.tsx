import { type FC, useEffect, useState } from 'react';
import { Tabs, List } from 'react-vant';
import ExecuteItem from './ExecuteItem';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { getExecuteList } from '@/api/execute';
import './index.scss';
export const Execute = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [pageSize] = useState(5); // 每页加载的数量
  const [tabData, setTabData] = useState<any>({}); // 存储每个标签页的状态
  const orderList = [
    {
      id: 1,
      name: '待执行',
    },
    {
      id: 4,
      name: '已执行',
    },
    {
      id: 3,
      name: '执行中',
    },
    {
      id: 2,
      name: '已取消',
    },
  ];
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
  // 新增订单
  useEffect(() => {
    console.log('activeTab', activeTab);
  }, [activeTab]);
  useEffect(() => {
    const initialData: any = {};
    orderList.forEach((tab) => {
      initialData[tab.id] = {
        page: 1,
        finished: false,
        orders: [],
      };
    });
    setTabData(initialData);
  }, []);
  const onLoad = async () => {
    const currentTab = tabData[activeTab];
    if (!currentTab) return;
    const { page, orders } = currentTab;
    const res: any = await getExecuteList({
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
  const changeTab = (tab: any) => {
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
  const handleOprateOrder = () => {};
  return (
    <>
      <TopHeader title="我的执行" />
      <div className="order-box">
        <Tabs
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
                    {tabData[item.id]?.orders.map(
                      (order: any, index: number) => (
                        <ExecuteItem
                          key={index}
                          {...order}
                          onOprateOrder={handleOprateOrder}
                        />
                      )
                    )}
                  </List>
                ) : null}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};
