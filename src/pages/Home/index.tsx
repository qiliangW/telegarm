import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import tipIcon from '@/assets/imgs/tip-icon.png';
import { getNewsList } from '@/api/news';
import homeIcon1 from '@/assets/imgs/home-icon-1.png';
import homeIcon2 from '@/assets/imgs/home-icon-2.png';
import homeIcon3 from '@/assets/imgs/home-icon-3.png';
import Marquee from 'react-fast-marquee';
import './index.scss';

export const Home: FC = () => {
  const navigate = useNavigate(); //react-router-dom
  const [newList, setNewList] = useState<any[]>([]);
  const [page, setPage] = useState(1); // 当前页码
  const [pageSize] = useState(10); // 每页加载的数量
  const [titles, setTitle] = useState([]);
  const [finished, setFinished] = useState<boolean>(false);
  const fetchNewsList = () => {
    getNewsList({ page: 1, pageSize }).then((res: any) => {
      const titles = res.list.map((item: any) => item.title);
      setTitle(titles);
      setNewList(res.list);
    });
  };
  const onLoad = async () => {
    const data: any = await getNewsList({ page, pageSize });

    setNewList((v: any) => [...v, ...(data?.list || [])]);
    if (data?.list?.length < pageSize) {
      setFinished(true); // 如果返回的数据少于 pageSize，说明没有更多数据了
    } else {
      setPage((prevPage) => prevPage + 1); // 否则加载下一页
    }
  };
  useEffect(() => {
    fetchNewsList();
  }, []);

  return (
    <div className="home-page-wrap">
      <div className="home-tips">
        <img src={tipIcon} alt="" className="tip-icon" />
        <Marquee speed={100} autoFill={true} gradient={false}>
          {titles.map((item) => {
            return <p key={item}>{item}</p>;
          })}
        </Marquee>
      </div>
      <div className="new-list">
        <div className="new-item">
          <div className="content">
            <div className="content-box">
              <div className="content-text">Hero Section</div>
              <div className="border"></div>
              <div className="insturation">
                释放强大网络压力测试 - L4/L7 全覆盖
              </div>
              <div className="insturation-detail">
                可靠、稳定、价格亲民的DDoS测试服务，助你验证系统韧性！
              </div>
              <div className="btn1">立即查看计划</div>
            </div>
            <div className="img1-box">
              <img src={homeIcon1} alt="" />
            </div>
          </div>
        </div>
        <div className="new-item2">
          <div className="content">
            <div className="img2-box">
              <img src={homeIcon2} alt="" />
            </div>
            <div className="content-box2">
              <div className="content-text">Features Section</div>
              <div className="border"></div>
              <div className="insturation">为什么选择我们?</div>
              <div className="insturation-detail">
                多种攻击方式支持L4/L7攻击，覆盖多种协（TCP、UDP、HTTP、DNS等），灵活适配不同测试场景，全面验证目标系统。
              </div>
            </div>
          </div>
        </div>
        <div className="new-item3">
          <div className="content">
            <div className="content-box2">
              <div className="content-text">可靠与稳定</div>
              <div className="insturation-details top">
                高性能服务器集群，确保攻击流量的持续性和稳定性。
              </div>
              <div className="insturation-details">
                99.9% uptime，测试过程无中断。
              </div>
            </div>
            <div className="img3-box">
              <img src={homeIcon3} alt="" />
            </div>
          </div>
        </div>

        <div className="new-item4">
          <div className="box">
            <div className="big-title">CTA Section</div>
            <div className="border"></div>
            <div className="insturation">现在开始，保护你的网络！</div>
            <div className="last-title">只需要几秒钟，选择适合你的计划，</div>
            <div className="last-title">立即体验顶级的压力测</div>
          </div>
          {/* <div className="content">
            <div className="content-box2">
              <div className="content-text">可靠与稳定</div>
              <div className="insturation-details top">
                高性能服务器集群，确保攻击流量的持续性和稳定性。
              </div>
              <div className="insturation-details">
                99.9% uptime，测试过程无中断。
              </div>
            </div>
            <div className="img3-box">
              <img src={homeIcon3} alt="" />
            </div>
          </div> */}
        </div>
      </div>
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '400px',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}
      >
        222
      </div> */}
    </div>
  );
};
