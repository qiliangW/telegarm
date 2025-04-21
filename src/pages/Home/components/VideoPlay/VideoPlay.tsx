import { useEffect, useRef, useState } from 'react';
import './VideoPlay.scss';

// import ReactPlayer from 'react-player'

// import videoUrl1 from '@/assets/imgs/play1.mp4'
// import videoUrl2 from '@/assets/imgs/play2.mp4'
// import videoUrl3 from '@/assets/imgs/play3.mp4'
import useStore from '@/strore';

export default ({ progress }) => {
  const gender = useStore((state: any) => state.gender);
  const currentLevel = useStore((state: any) => state.currentLevel);

  let videoUrlMap = {
    male: {
      1: {
        1: '/tg-assets/play/video/male/1/1.mp4',
        2: '/tg-assets/play/video/male/1/2.mp4',
        3: '/tg-assets/play/video/male/1/3.mp4',
      },
      2: {
        1: '/tg-assets/play/video/male/2/1.mp4',
        2: '/tg-assets/play/video/male/2/2.mp4',
        3: '/tg-assets/play/video/male/2/3.mp4',
      },
      3: {
        1: '/tg-assets/play/video/male/3/1.mp4',
        2: '/tg-assets/play/video/male/3/2.mp4',
        3: '/tg-assets/play/video/male/3/3.mp4',
      },
      4: {
        1: '/tg-assets/play/video/male/4/1.mp4',
        2: '/tg-assets/play/video/male/4/2.mp4',
        3: '/tg-assets/play/video/male/4/3.mp4',
      },
    },
    female: {
      1: {
        1: '/tg-assets/play/video/female/1/1.mp4',
        2: '/tg-assets/play/video/female/1/2.mp4',
        3: '/tg-assets/play/video/female/1/3.mp4',
      },
      2: {
        1: '/tg-assets/play/video/female/2/1.mp4',
        2: '/tg-assets/play/video/female/2/2.mp4',
        3: '/tg-assets/play/video/female/2/3.mp4',
      },
      3: {
        1: '/tg-assets/play/video/female/3/1.mp4',
        2: '/tg-assets/play/video/female/3/2.mp4',
        3: '/tg-assets/play/video/female/3/3.mp4',
      },
      4: {
        1: '/tg-assets/play/video/female/4/1.mp4',
        2: '/tg-assets/play/video/female/4/2.mp4',
        3: '/tg-assets/play/video/female/4/3.mp4',
      },
    },
  };
  let posterUrlMap = {
    male: {
      1: {
        1: '/tg-assets/play/poster/male/1/1.png',
        2: '/tg-assets/play/poster/male/1/2.png',
        3: '/tg-assets/play/poster/male/1/3.png',
      },
      2: {
        1: '/tg-assets/play/poster/male/2/1.png',
        2: '/tg-assets/play/poster/male/2/2.png',
        3: '/tg-assets/play/poster/male/2/3.png',
      },
      3: {
        1: '/tg-assets/play/poster/male/3/1.png',
        2: '/tg-assets/play/poster/male/3/2.png',
        3: '/tg-assets/play/poster/male/3/3.png',
      },
      4: {
        1: '/tg-assets/play/poster/male/4/1.png',
        2: '/tg-assets/play/poster/male/4/2.png',
        3: '/tg-assets/play/poster/male/4/3.png',
      },
    },
    female: {
      1: {
        1: '/tg-assets/play/poster/female/1/1.png',
        2: '/tg-assets/play/poster/female/1/2.png',
        3: '/tg-assets/play/poster/female/1/3.png',
      },
      2: {
        1: '/tg-assets/play/poster/female/2/1.png',
        2: '/tg-assets/play/poster/female/2/2.png',
        3: '/tg-assets/play/poster/female/2/3.png',
      },
      3: {
        1: '/tg-assets/play/poster/female/3/1.png',
        2: '/tg-assets/play/poster/female/3/2.png',
        3: '/tg-assets/play/poster/female/3/3.png',
      },
      4: {
        1: '/tg-assets/play/poster/female/4/1.png',
        2: '/tg-assets/play/poster/female/4/2.png',
        3: '/tg-assets/play/poster/female/4/3.png',
      },
    },
  };

  let getVideoSrcByProgress = (gender, level, progress) => {
    let num = 1;
    if (progress <= 33) {
      num = 1;
    } else if (progress > 33 && progress <= 66) {
      num = 2;
    } else if (progress > 66 && progress <= 100) {
      num = 3;
    }
    return import.meta.env.VITE_APP_CDN_URL+videoUrlMap[gender][level][num];
  };
  let getPosterUrlByProgress = (gender, level, progress) => {
    let num = 1;
    if (progress <= 33) {
      num = 1;
    } else if (progress > 33 && progress <= 66) {
      num = 2;
    } else if (progress > 66 && progress <= 100) {
      num = 3;
    }
    return import.meta.env.VITE_APP_CDN_URL+posterUrlMap[gender][level][num];
  };

  let [videoSrc, setVideoSrc] = useState('');
  let [posterUrl, setPosterUrl] = useState('');

  let flag;
  let setWidth = (el) => {
    if (flag === true) return;
    flag = true;
    let videoOuterEl = document.querySelector('.video-v-outer');
    let { width, height } = videoOuterEl.getBoundingClientRect();
    el.width = width;
    el.height = height;
  };
  const divRef = useRef(null);

  useEffect(() => {
    const video = document.getElementById('pVideo');
    setWidth(video);

    let src = getVideoSrcByProgress(gender, currentLevel.level, progress);
    let posterSrc = getPosterUrlByProgress(
      gender,
      currentLevel.level,
      progress
    );

    setVideoSrc(src);
    setPosterUrl(posterSrc);
    //  console.log(gender,currentLevel.level, 'pppp===' )

    // console.log(divRef.current, 'divRef');
  }, [progress, gender, currentLevel]);

  useEffect(() => {
    if (divRef.current && videoSrc) {
      divRef.current?.load();
      divRef.current?.pause();
      divRef.current.currentTime = 0;
      divRef.current?.play();
    }
  }, [videoSrc]);

  let onReady = () => {
    console.log('readt');
  };

  return (
    <div className="video-v-outer">
      <div className="video-v-wrap">
        <video
          poster={posterUrl}
          id="pVideo"
          ref={divRef}
          muted={true}
          autoPlay={true}
          loop
          playsInline
          preload="auto"
          src={videoSrc}
        >
          {/* <source src={videoSrc} type="video/mp4" /> */}
        </video>
      </div>

      <img src={posterUrl} alt="" className="video-bg" />
      {/* <ReactPlayer 
            ref={divRef}
            url={videoSrc} 
            loop
            playing
            width="100%" 
            height="100%"
            onReady={onReady}/> */}
      {/* <div className="mask"></div> */}
    </div>
  );
};
