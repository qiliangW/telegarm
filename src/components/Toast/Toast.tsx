import toast from 'react-hot-toast';

let customId = 'toast-def-tid';
const defaultOptions = {
  duration: 1500,
  className: 'aabbc',
  id: customId,
  style: {
    left: '50%',
    right: 'initial',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  onClick: () => {
    console.log('onClick');
    toast.remove();
  },
};
export default (component: any, options: any = {}) => {
  const toastId = toast.custom(
    <div
      onClick={() => toast.dismiss(toastId)}
      onMouseEnter={() => {
        toast.dismiss(toastId);
      }}
    >
      {component}
    </div>,
    { ...defaultOptions, ...options }
  );
  setTimeout(() => {
    toast.remove();
  }, options?.duration || defaultOptions.duration);
};
