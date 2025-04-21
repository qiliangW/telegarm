import { type FC, useEffect, useState } from 'react';
import { TopHeader } from '@/components/TopHeader/TopHeader';
import { WarningO } from '@react-vant/icons';
import { Input, Cell, Button, Toast } from 'react-vant';
import { updatePayAddress } from '@/api/user';
import { useLocation } from 'react-router-dom';
import './index.scss';
export default function Payment() {
  const [address, setAddress] = useState('');
  const location = useLocation();
  const { useraddress } = location.state || {};
  const _updatePayAddress = async () => {
    console.log(address);
    try {
      await updatePayAddress({
        address,
      });
    } catch (e: any) {
      Toast.fail(e);
    }
  };
  useEffect(() => {
    if (useraddress) {
      setAddress(useraddress);
    }
  });
  return (
    <div className="pay-box">
      <TopHeader title="设置收款地址" showBack />
      <div className="payment-content">
        <div className="test-package pay-custom">
          <span className="test-package-icon">
            <WarningO color="#a98420" fontSize={'20px'} />
          </span>
          <p style={{ fontSize: '12px' }}>
            收款地址一旦输错，将导致资产永久丢失且无法追回!
          </p>
        </div>
        <div>
          <Cell>
            <Input
              value={address}
              onChange={(text) => setAddress(text)}
              placeholder="输入TRC20地址"
            />
          </Cell>
          <Cell></Cell>
        </div>
        {/* <div className="qr-code"></div> */}
        {/* <div className="payment-tip">
          <p className="title">请往以下地址转入</p>
          <div className="usdt-address">100.017405 USDT TU5d</div>
          <div className="pay-notice">
            <p>注意：</p>
            <div>
              <div className="tip1">
                <div className="no">1</div>
                <p>请在 2025-03-22 13:48:</p>
              </div>
              <div className="tip2">
                <div className="no">2</div>
                <p>请在 2025-03-22 13:48:</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="update-btn">
        <Button
          color="#00D676"
          block
          round
          size="large"
          onClick={_updatePayAddress}
        >
          确定
        </Button>
      </div>
    </div>
  );
}
