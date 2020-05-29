import { IConfig } from '../types';

let config: IConfig = {
  remoteServiceURL: '//localhost:4000/outreach',
};

export const setConfig = (newConfig: Partial<IConfig>) => {
  config = {
    ...config,
    ...newConfig,
  };
};

export const getConfig: () => IConfig = () => {
  return config;
};