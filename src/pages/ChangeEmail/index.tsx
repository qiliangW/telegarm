import { useState } from 'react';
import { Cell, Input, Button, Toast } from 'react-vant';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { changeEmail } from '@/api/user';
import { sendCode } from '@/api/login';
import useStore from '@/strore';
import { useNavigate } from 'react-router-dom';
import './index.scss';
export const ChangeEmail = () => {
  const navigate = useNavigate();
  const setToken = useStore((state: any) => state.setToken);
  const [emailInfo, setEmailInfo] = useState({
    email: '',
    captcha: '', // 验证码
    captchaId: '',
  });
  const _sendCode = async () => {
    try {
      const res: any = await sendCode({ email: emailInfo.email });
      setEmailInfo((prev) => ({
        ...prev,
        captchaId: res.captchaId,
      }));
    } catch (e: any) {
      Toast.fail(e);
      console.log(e);
    }
  };
  const _updateEmail = async () => {
    try {
      await changeEmail({
        ...emailInfo,
      });
      setToken('');
      navigate('/');
    } catch (e: any) {
      Toast.fail(e);
    }
  };
  return (
    <div className="chagne-email">
      <TopHeader title="设置新邮箱" showBack={true} />
      <div className="content-change">
        <p>更换邮箱</p>
        <span>更换邮箱后，下次登录请使用新邮箱备份</span>
        <div className="email-box-change">
          <div className="code-email">
            <Cell>
              <Input
                value={emailInfo.email}
                onChange={(text) =>
                  setEmailInfo((prev: any) => ({
                    ...prev,
                    email: text,
                  }))
                }
                placeholder="请输入新邮箱"
              />
            </Cell>

            <Cell style={{ marginTop: '20px' }}>
              <Input
                value={emailInfo.captcha}
                onChange={(text) =>
                  setEmailInfo((prev: any) => ({
                    ...prev,
                    captcha: text,
                  }))
                }
                suffix={
                  <span className="send-code" onClick={_sendCode}>
                    发送验证码
                  </span>
                }
                // value={state.text}
                // onChange={(text) => updateState({ text })}
                placeholder="请输入验证码"
              />
            </Cell>
            <Cell></Cell>
          </div>
        </div>
      </div>
      <div className="update-btn">
        <Button color="#00D676" block round size="large" onClick={_updateEmail}>
          更换邮箱
        </Button>
      </div>
    </div>
  );
};
