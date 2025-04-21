import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

const AutoScrollToTop = ({ children }: any) => {
  const location = useLocation();
  console.log('location', location);
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default AutoScrollToTop;
