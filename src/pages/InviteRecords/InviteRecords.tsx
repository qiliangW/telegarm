import { type FC, useEffect, useState } from 'react';

import './InviteRecords.scss';

import { NavBar } from '@/components/NavBar/NavBar';
import { InviteReward } from '@/components/InviteReward/InviteReward';
import { inviteList } from '@/api/invite';
export const InviteRecords: FC = () => {
  const [list, setInviteList] = useState([]);
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState(0);
  const getInviteList = () => {
    // 获取邀请列表
    inviteList({}).then((res: any) => {
      console.log(res);
      setInviteList(res.tableInfo.rows || []);
      setToken(res.totalAward);
      setTotal(res.tableInfo.total);
    });
  };
  useEffect(() => {
    getInviteList();
  }, []);
  return (
    <div className="invite-records-ds-outer">
      <NavBar />

      <div className="invite-records-ds-wrap">
        <InviteReward
          isToken={false}
          reward={token ?? 0}
          unit="ENERGY"
          num={total}
        />

        <div className="invite-records-lists-wrap">
          {list.map((item: any) => (
            <div className="item-wrap" key={item}>
              <div className="l">
                <div className="name">{item.nickName}</div>
                <div className="address">{item.userUuid}</div>
              </div>
              <span className="num">+{item.rewardCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
