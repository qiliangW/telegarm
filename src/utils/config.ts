import { getConfig } from '@/api/config';
let config = {};
export const setConfigData = async () => {
  config = await getConfig();
};
export const getConfigData = () => {
  return config;
};
