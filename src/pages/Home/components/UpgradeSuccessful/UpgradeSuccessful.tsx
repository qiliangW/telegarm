import { useEffect } from 'react';
import './UpgradeSuccessful.scss';

export default ({ playCurrentLevel, cancelPlayCurrentLevel, token = 0 }) => {
  return (
    <div className="upgrade-suc-u-outer animate__animated animate__fadeIn duration-1s">
      <div className="upgrade-suc-u-wrap">
        <div className="txt">
          Unlocking costs {token} EDEN coins. Would you like to unlock a new
          healer to earn more coins?
        </div>
        <div className="btns">
          <span onClick={cancelPlayCurrentLevel}>Cancel</span>
          <span className="confirm" onClick={playCurrentLevel}>
            Yes
          </span>
        </div>
      </div>
    </div>
  );
};
