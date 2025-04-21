import { useEffect, useRef, useCallback } from 'react';
import './SwipeSlider.scss';

import { initHapticFeedback } from '@telegram-apps/sdk';
import useStore from '@/strore';
import _ from 'lodash';
import { isMobile } from '@/utils/index';
let lastX = 0;
let lastY = 0;
let isDrawing = false;
let swipeDirection;
let resultVal;
let width = 0;
let limitBottom; //weak坐标临界值
let height = 0;
let lineWidth = 1;
let tempDirection;
let canvasOuterRect; //外层div属性
export default ({ onTouchStart, onTouchEnd, onSwipeOnce }) => {
  const hapticFeedback = initHapticFeedback();
  const startGame = useStore((state: any) => state.startGame);
  let canvasOuterEl = useRef(null); //外层div
  const drawingCanvas = useRef(null); //canvas
  let limitTop = 50; //strong坐标临界值

  const ctx = useRef(null);
  let getRelativePosition = (e) => {
    //获取相对坐标
    let position = e;
    if (isMobile) {
      position = e.touches[0];
    }
    let { pageX, pageY } = position;

    canvasOuterRect = canvasOuterEl.current.getBoundingClientRect();

    let topDistance = canvasOuterRect.top + window.scrollY;
    let leftDistance = canvasOuterRect.left + window.scrollX;
    return [pageX - leftDistance, pageY - topDistance];
  };

  let resetResult = () => {
    //重置结果
    resultVal = null;
  };
  let directionMap = {
    up: -1,
    down: 1,
  };
  let setResult = (direction: string) => {
    //设置结果 direction代表方向 up和down
    let num = directionMap[direction];
    if (resultVal !== null) {
      if (resultVal !== num) {
        resultVal += num;
      }
    } else {
      resultVal = num;
    }
    if (resultVal === 0) {
      //滑动一次
      if (direction == 'up') {
        //弱到强记录一次
        onSwipeOnce();
      }
      resetResult();
    }
  };
  const vibrate = useCallback(() => {
    //震动
    hapticFeedback.impactOccurred('soft');
  }, []);
  const throttledVibrate = _.throttle(vibrate, 500, { trailing: false });
  function stopDrawing() {
    resetResult();
    onTouchEnd();
    isDrawing = false;
    // ctx.current.beginPath();
    ctx.current.clearRect(0, 0, width, height);
  }
  function startDrawing(e) {
    onTouchStart();
    resetResult();
    canvasOuterRect = canvasOuterEl.current.getBoundingClientRect();

    isDrawing = true;
    lineWidth = 1;
    [lastX, lastY] = getRelativePosition(e);
  }
  const draw = (e) => {
    e.preventDefault();
    throttledVibrate();
    if (!isDrawing) return;
    let curPosition = getRelativePosition(e);

    ctx.current.strokeStyle = `rgba(242, 173, 255, 1)`;
    ctx.current.lineWidth = lineWidth;
    ctx.current.lineJoin = 'round';
    ctx.current.lineCap = 'round';
    // 震动
    // 在一定的时间内执行固定的次数

    // console.log(curPosition,lastX, lastY, 'curPosition')
    ctx.current.beginPath();
    ctx.current.moveTo(lastX, lastY);
    ctx.current.lineTo(curPosition[0], curPosition[1]);
    ctx.current.stroke();

    const diffX = curPosition[0] - lastX;
    const diffY = curPosition[1] - lastY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        tempDirection = 'right';
      } else {
        tempDirection = 'left';
      }
    } else {
      if (diffY > 0) {
        tempDirection = 'down';
      } else {
        tempDirection = 'up';
      }

      if (curPosition[1] <= limitTop) {
        //滑动到达上临界值
        setResult('up');
      } else if (curPosition[1] >= limitBottom) {
        //滑动到达下临界值
        setResult('down');
      }
    }
    if (swipeDirection && swipeDirection != tempDirection) {
      lineWidth = 1;
      ctx.current.clearRect(0, 0, width, height);
    }
    swipeDirection = tempDirection;

    [lastX, lastY] = [curPosition[0], curPosition[1]];

    lineWidth += 0.5;
    if (lineWidth >= 18) lineWidth = 18;
  };

  useEffect(() => {
    ctx.current = drawingCanvas.current.getContext('2d');

    canvasOuterRect = canvasOuterEl.current.getBoundingClientRect();

    width = canvasOuterRect.width;
    height = canvasOuterRect.height;

    limitBottom = height - 50;
    drawingCanvas.current.width = width;
    drawingCanvas.current.height = height;
  }, []);

  useEffect(() => {
    if (isMobile) {
      drawingCanvas.current.addEventListener('touchstart', startDrawing);
      drawingCanvas.current.addEventListener('touchmove', draw);
      drawingCanvas.current.addEventListener('touchend', stopDrawing);
      drawingCanvas.current.addEventListener('touchcancel', stopDrawing);
    } else {
      drawingCanvas.current.addEventListener('mousedown', startDrawing);
      drawingCanvas.current.addEventListener('mousemove', draw);
      drawingCanvas.current.addEventListener('mouseup', stopDrawing);
    }
    return () => {
      if (isMobile) {
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('touchstart', startDrawing);
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('touchmove', draw);
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('touchend', stopDrawing);
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('touchcancel', stopDrawing);
      } else {
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('mousedown', startDrawing);
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('mousemove', draw);
        drawingCanvas.current &&
          drawingCanvas.current.removeEventListener('mouseup', stopDrawing);
      }
    };
  });

  return (
    <div
      className="swipeslder-s-outer"
      id="drawingCanvasOuter"
      ref={canvasOuterEl}
    >
      <canvas id="drawingCanvas" ref={drawingCanvas}></canvas>
    </div>
  );
};
