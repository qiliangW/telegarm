import { type FC, useEffect, useState } from 'react';
import { Tabs, List } from 'react-vant';
import WayItem from './WayItem';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { getWorkerList, updateWork } from '@/api/way';
import './index.scss';
export const Way = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [pageSize] = useState(5); // 每页加载的数量
  const [tabData, setTabData] = useState<any>({}); // 存储每个标签页的状态
  const orderList = [
    {
      id: 0,
      name: '全部',
    },
    {
      id: 1,
      name: '开启',
    },
    {
      id: 2,
      name: '关闭',
    },
  ];
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
  const onLoad = async () => {
    const currentTab = tabData[activeTab];
    if (!currentTab) return;
    const { page, orders } = currentTab;
    const res: any = await getWorkerList({
      page,
      pageSize,
      on: activeTab ? activeTab : '',
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
  const handleOprateOrder = () => {};
  const changeSwitch = async (on: string, props: any) => {
    try {
      //更新状态;
      await updateWork({ ...props, on });
      // 更新本地状态
      setTabData((prev: any) => {
        const currentTab = prev[activeTab];
        if (!currentTab) return prev;

        const updatedOrders = currentTab.orders.map((order: any) =>
          order.ID == props.ID ? { ...order, on } : order
        );
        console.log(222);
        return {
          ...prev,
          [activeTab]: {
            ...currentTab,
            orders: updatedOrders,
          },
        };
      });
    } catch (error) {
      console.error('更新失败:', error);
    }
  };
  return (
    <div className="order-box">
      <TopHeader title="我的方式" showBtn />
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
                          <WayItem
                            key={index}
                            {...order}
                            onOprateOrder={handleOprateOrder}
                            onSwitchChange={changeSwitch}
                          />
                        )
                      )}
                    </List>
                  ) : null}
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
