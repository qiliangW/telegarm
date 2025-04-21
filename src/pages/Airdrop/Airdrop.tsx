import { useNavigate } from 'react-router-dom';

import { TopHeader } from '@/components/TopHeader/TopHeader';

import './Airdrop.scss';

// import banner from '@/assets/imgs/airdrop/banner.png';
// import icon_wallet from '@/assets/imgs/airdrop/icon-wallet.png';
// import icon_ball from '@/assets/imgs/airdrop/icon-ball.png';
// import icon_link from '@/assets/imgs/airdrop/icon1.png';
// import right_arrow from '@/assets/imgs/airdrop/right-arrow.png';

// import pic1 from '@/assets/imgs/airdrop/pic1.png';
// import pic2 from '@/assets/imgs/airdrop/pic2.png';
// import pic3 from '@/assets/imgs/airdrop/pic3.png';
// import icon_tag1 from '@/assets/imgs/airdrop/icon-tag1.png';
// import icon_tag2 from '@/assets/imgs/airdrop/icon-tag2.png';

import { initUtils } from '@telegram-apps/sdk';

export const Airdrop = () => {
  const navigate = useNavigate(); //react-router-dom
  let toInviteRecords = () => {
    navigate('/inviteRecords');
  };

  const utils = initUtils();

  let toWebsite = () => {
    //打开官网
    utils.openLink('https://eden.sexualfi.com');
  };
  const toWebsiteMiniappmalePay = () => {
    utils.openLink(
      `https://eden.sexualfi.com/forbidden-fruit-tg?type=2&code=Miniappmale`
    );
  };
  const toWebsiteMiniappfemalePay = () => {
    utils.openLink(
      `https://eden.sexualfi.com/forbidden-fruit-tg?type=1&code=Miniappfemale`
    );
  };
  return null;
  // <div className="airdrop-a-outer">
  //   {/* <TopHeader/> */}

  //   <div className="top-wrap">
  //     <div className="connect-btn-wrap">
  //       <span className="txt">Connect wallet</span>
  //       <img src={icon_wallet} alt="" className="btn" />
  //     </div>

  //     <div className="banner-wrap">
  //       <img src={banner} alt="" />
  //     </div>
  //   </div>

  //   <div className="airdrop-a-wrap">
  //     <div className="txt1">Participate in airdrop</div>
  //     <div className="txt2">The first phase of super airdrop begins</div>
  //     <div className="txt3">
  //       Preorder EDEN Forbidden Fruits and enjoy Do-to-earn
  //     </div>

  //     <div
  //       className="link-wrap"
  //       onClick={toWebsite}
  //       data-umami-event="Enter the official website"
  //     >
  //       <img src={icon_link} alt="" className="icon" />
  //       <div className="l">
  //         <img src={icon_ball} alt="" className="ball" />
  //         <span className="txt">https://eden.sexualfi.com</span>
  //       </div>

  //       <img src={right_arrow} alt="" className="arrow" />
  //     </div>

  //     <div className="products-wrap">
  //       <div
  //         className="product-wrap product-s-wrap product-wrap1"
  //         onClick={toWebsiteMiniappfemalePay}
  //       >
  //         <div className="tag-wrap">
  //           <img src={icon_tag1} alt="" />
  //           <div className="title">EDEN Women's Toys</div>
  //         </div>
  //         <img src={pic1} alt="" className="pic" />
  //       </div>
  //       <div
  //         className="product-wrap product-s-wrap product-wrap2"
  //         onClick={toWebsiteMiniappmalePay}
  //       >
  //         <div className="tag-wrap">
  //           <img src={icon_tag1} alt="" />
  //           <div className="title">EDEN Men's Toys</div>
  //         </div>
  //         <img src={pic2} alt="" className="pic" />
  //       </div>
  //     </div>

  //     <div className="products-wrap">
  //       <div className="product-wrap product-wrap3">
  //         <div className="tag-wrap">
  //           <img src={icon_tag2} alt="" />
  //           <div className="title">EDEN NFT</div>
  //         </div>
  //         <span className="Coming">Coming soon</span>
  //         <img src={pic3} alt="" className="pic" />
  //       </div>
  //     </div>
  //   </div>
  // </div>
};
