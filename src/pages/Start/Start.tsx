import { type FC, useEffect } from 'react';
import './Start.scss';
import { Input, Cell, Button, Checkbox } from 'react-vant';
import { useNavigate } from 'react-router-dom';
export const Login: FC = () => {
  //const setIsFirstUse = useStore((state: any) => state.setIsFirstUse);

  const navigate = useNavigate(); //react-router-dom

  // let getTaskInfo = async () => {
  //   try {
  //     let res = await checkTask({ taskId: 1 });
  //     if (res) {
  //       //新手指导已完成
  //       setIsFirstUse(false);
  //       navigate('/home/play', { replace: true });
  //     } else {
  //       setIsFirstUse(true);
  //       navigate('/guide', { replace: true });
  //     }
  //   } catch (e) {}
  // };
  // getTaskInfo();

  useEffect(() => {
    setTimeout(() => {
      const path = '/home';
      // let path =  '/home/play';

      //navigate(path, { replace: true });
    }, 1000);
  }, []);

  return (
    <div className="start-page-wrap">
      {/* <div className="login-logo">欢迎登录</div> */}
      <div className="login-box">
        <Cell>
          <Input type="tel" placeholder="请输入邮箱" />
        </Cell>
        <Cell>
          <Input
            suffix={
              <Button size="mini" type="primary">
                发送验证码
              </Button>
            }
            placeholder="请输入短信验证码"
          />
        </Cell>

        <div className="login-remember">
          <Checkbox checked={true} iconSize={'15px'}>
            记住邮箱
          </Checkbox>
        </div>
        <div className="login-btn">
          <Button type="primary" block round>
            登录
          </Button>
        </div>
      </div>

      {/* <Button type="primary" size="small">
        Primary
      </Button> */}
    </div>
  );
};
