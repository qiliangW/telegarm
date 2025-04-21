import './SignItems.scss';

import { SignItem } from '../SignItem/SignItem';
interface SignItemsProps {
  signList: any[];
}
export const SignItems = ({ signList }: SignItemsProps) => {
  return (
    <div className="e-sign-items-wrap">
      {signList.map((item: any) => (
        <SignItem {...item} key={item.id} />
      ))}
    </div>
  );
};
