import { type FC, useState, useEffect } from 'react';
import './index.scss';
import userEmail from '@/assets/imgs/user-email.png';
import verificationCode from '@/assets/imgs/verification-code.png';
import { Input, Cell, Button, Checkbox } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { Tabs, Toast, CountDown } from 'react-vant';
import useStore from '@/strore';
import { setConfigData } from '@/utils/config';
import { userLogin, sendCode, providerLogin } from '@/api/login';
export const Login: FC = () => {
  // 记住邮箱的状态
  const [checked, setChecked] = useState(true);
  const [active, setActive] = useState('Custom');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCountDown, setShowCountDown] = useState(false);
  const [captchaId, setCaptchaId] = useState('');
  const setLoginType = useStore((state: any) => state.setLoginType);
  const setToken = useStore((state: any) => state.setToken);
  const navigate = useNavigate(); //react-router-dom
  const goToHome = async () => {
    try {
      if (active === 'Custom') {
        const res: any = await userLogin({ email, captchaId, captcha: code });
        setToken(res.token);
        setConfigData();
      } else {
        const res: any = await providerLogin({
          email,
          captchaId,
          captcha: code,
        });
        setToken(res.token);
        setConfigData();
      }
      if (checked) {
        localStorage.setItem('savedEmail', email);
      } else {
        // 如果未勾选，清除保存的邮箱
        localStorage.removeItem('savedEmail');
      }
      setTimeout(() => {
        navigate('/home', { replace: true });
      });
    } catch (e) {
      // Toast.error('登陆失败');
    }
  };
  const userEmailIcon = () => {
    return <img src={userEmail} alt="userEmail" className="userEmail-icon" />;
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail); // 设置到输入框
      setChecked(true); // 默认勾选“记住邮箱”
    }
    setLoginType('Custom');
  }, []);
  const changeTab = (name: string) => {
    setLoginType(name);
  };

  const _sendCode = () => {
    setShowCountDown(true);
    sendCode({ email }).then((res: any) => {
      console.log(res);
      setCaptchaId(res.captchaId);
      setCode(res.message.split(' ')[1]);
    });
  };

  const verificationCodeIcon = () => {
    return (
      <img
        src={verificationCode}
        alt="verificationCode"
        className="verificationCode-icon"
      />
    );
  };
  return (
    <div className="start-page-wrap">
      {/* <div className="login-logo">欢迎登录</div> */}
      <div className="login-box">
        <div className="login-title">欢迎登录</div>
        <Tabs
          onChange={(name: any) => {
            changeTab(name);
            setActive(name);
          }}
        >
          <Tabs.TabPane title="用户登录" name="Custom" />
          <Tabs.TabPane title="资源方登录" name="Provider" />
        </Tabs>
        <Cell icon={userEmailIcon()}>
          <Input
            placeholder="请输入邮箱"
            value={email}
            onChange={(val) => setEmail(val)}
          />
        </Cell>
        <Cell icon={verificationCodeIcon()} style={{ marginTop: '20px' }}>
          <Input
            value={code}
            suffix={
              <>
                {showCountDown ? (
                  <CountDown
                    time={1000 * 60}
                    millisecond
                    format="ss"
                    onFinish={() => {
                      setShowCountDown(false);
                    }}
                  />
                ) : (
                  <span className="send-code" onClick={_sendCode}>
                    发送验证码
                  </span>
                )}
              </>
            }
            placeholder="请输入邮箱证码"
            // onChange={(val) => setCode(val)}
          />
        </Cell>

        <div className="login-remember">
          <Checkbox
            checked={checked}
            iconSize={'15px'}
            defaultChecked
            checkedColor="#00d676"
            onChange={(e) => {
              setChecked(e);
            }}
          >
            记住邮箱
          </Checkbox>
        </div>
        <div className="login-btn">
          <Button color="#00D676" block round size="large" onClick={goToHome}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};
