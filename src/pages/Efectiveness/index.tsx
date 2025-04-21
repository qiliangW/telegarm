import { type FC, useEffect, useState, useRef } from 'react';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { getpingData } from '@/api/ping';
import { useLocation } from 'react-router-dom';
import {
  jsx,
  Canvas,
  Chart,
  Area,
  Line,
  ScrollBar,
  Axis,
  Tooltip,
  Interval,
} from '@antv/f2';
import './index.scss';
import dayjs from 'dayjs';
export const Effectiveness = () => {
  const location = useLocation();
  const { execNum } = location.state || {};
  const ChartRef = useRef(null);
  const [list, setList] = useState([]);
  useEffect(() => {
    getpingData(execNum).then((res: any) => {
      const data = res.list.map((item: any) => ({
        ...item,
        CreatedAt: dayjs(item.CreatedAt).valueOf(),
      }));

      initChart(data);
    });
  }, []);

  const initChart = (data: any) => {
    // const data = [
    //   { genre: 'Sports', sold: 275 },
    //   { genre: 'Strategy', sold: 115 },
    //   { genre: 'Action', sold: 120 },
    //   { genre: 'Shooter', sold: 350 },
    //   { genre: 'Other', sold: 150 },
    // ];
    // const data = [
    //   {
    //     time: 'Jan.',
    //     tem: 1000,
    //   },
    //   {
    //     time: 'Feb.',
    //     tem: 2200,
    //   },
    //   {
    //     time: 'Mar.',
    //     tem: 2000,
    //   },
    //   {
    //     time: 'Apr.',
    //     tem: 2600,
    //   },
    //   {
    //     time: 'May.',
    //     tem: 2000,
    //   },
    //   {
    //     time: 'Jun.',
    //     tem: 2600,
    //   },
    //   {
    //     time: 'Jul.',
    //     tem: 2800,
    //   },
    //   {
    //     time: 'Aug.',
    //     tem: 2000,
    //   },
    // ];

    // 获取 canvas context
    const context = document.getElementById('chart-container').getContext('2d');
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={data}
          scale={{
            avgDelayMs: {
              min: 0,
              tickCount: 5,
            },
            CreatedAt: {
              range: [0, 1],
              tickCount: data.length,
            },
          }}
          // interactions={['pan', 'zoom']} // 启用拖拽交互
          // // 限制只在X轴方向拖拽
          // onGetG2Instance={(chart: any) => {
          //   console.log(2222);
          //   chart.interaction('pan').adjust({
          //     x: true, // 允许X轴拖拽
          //     y: false, // 禁止Y轴拖拽
          //   });
          // }}
        >
          {/* <Axis
            field="CreatedAt"
            // label={{
            //   rotate: Math.PI / 2, // 旋转 90 度
            //   textAlign: 'start', // 对齐方式
            //   textBaseline: 'middle', // 基线对齐方式
            //   formatter: (text: any) => {
            //     return ''; // 格式化时间
            //   },
            // }}
          /> */}
          <Axis field="avgDelayMs" label={null} />
          <Area x="CreatedAt" y="avgDelayMs" color={'#00965e'} />
          {/* <Line x="CreatedAt" y="avgDelayMs" /> */}
          <ScrollBar mode="x" range={[0, 0.1]} />
          <Tooltip />
        </Chart>
      </Canvas>
    );
    const chart = new Canvas(props);
    chart.render();
  };
  return (
    <div className="effectiveness-box">
      <TopHeader title="网络质量" showBack></TopHeader>
      <canvas id="chart-container" ref={ChartRef}></canvas>
    </div>
  );
};
