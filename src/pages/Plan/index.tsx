import { type FC, useEffect, useState } from 'react';
import { Tabs, List } from 'react-vant';
import PlanItem from './components/Plan/PlanItem';
import { getPlanList } from '@/api/plan';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { getpingData } from '@/api/ping';
export const Plan = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabData, setTabData] = useState<any>({}); // 存储每个标签页的状态
  const [pageSize] = useState(5); // 每页加载的数量
  const planList = [
    {
      id: 0,
      name: '全部',
    },
    {
      id: 1,
      name: '待执行',
    },
    {
      id: 3,
      name: '执行中',
    },
    {
      id: 4,
      name: '已执行',
    },

    {
      id: 2,
      name: '已取消',
    },
  ];
  useEffect(() => {
    const initialData: any = {};
    planList.forEach((tab) => {
      initialData[tab.id] = {
        page: 1,
        finished: false,
        plans: [],
      };
    });
    setTabData(initialData);
  }, []);
  const onLoad = async () => {
    const currentTab = tabData[activeTab];
    if (!currentTab) return;
    const { page, plans } = currentTab;
    const res: any = await getPlanList({
      page,
      pageSize,
      status: activeTab ? activeTab : '',
    });
    const newPlans = res?.list || [];

    setTabData((prev: any) => ({
      ...prev,
      [activeTab]: {
        plans: [...plans, ...newPlans],
        page: page + 1,
        finished: newPlans.length < pageSize, // 如果返回的数据少于 pageSize，说明没有更多数据了
      },
    }));
  };
  const changeTab = (tab: any) => {
    console.log(tab);
    setActiveTab(tab); // 更新当前激活的 Tab
    setTabData((prev: any) => ({
      ...prev,
      [tab]: {
        page: 1, // 重置分页
        finished: false, // 重置加载完成状态
        plans: [], // 清空当前 Tab 的订单数据
      },
    }));
  };
  useEffect(() => {
    console.log('activeTab', activeTab);
  }, [activeTab]);
  const deteltePlan = (plan: any) => {
    setTabData((prev: any) => {
      const updatedPlans = prev[activeTab].plans.filter(
        (item: any) => item.ID !== plan.ID
      );
      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          plans: updatedPlans,
        },
      };
    });
  };
  return (
    <div className="order-box">
      <TopHeader title="我的计划" showBtn={true} btnText="新建计划" />
      <Tabs
        active={activeTab}
        defaultActive={1}
        onChange={changeTab}
        background={'#222339'}
        sticky={true}
        offsetTop={'40px'}
      >
        {planList.map((item: any) => (
          <Tabs.TabPane key={item.id} title={item.name} name={item.id}>
            <div className="order-items">
              {item.id === activeTab ? (
                <List
                  finished={tabData[item.id]?.finished}
                  onLoad={onLoad}
                  finishedText="没有更多数据了"
                >
                  {tabData[item.id]?.plans.map((plan: any, index: number) => (
                    <PlanItem key={index} {...plan} onDelete={deteltePlan} />
                  ))}
                </List>
              ) : null}
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
