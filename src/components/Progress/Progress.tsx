import './Progress.scss';

export const Progress = ({ percent, children = null }) => {
  return (
    <div className="c-progress-outer">
      <div className="c-progress-wrap">
        <div className="c-progress">
          <div
            className="c-progress-inner animate__animated animate__slideInLeft"
            style={{ width: percent }}
          ></div>
        </div>
      </div>

      {children}
    </div>
  );
};
