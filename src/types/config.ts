import { WebsiteList } from '@/types';

export type UserConfig = {
  isStandardModel: boolean;
  theme: 'light' | 'dark' | null;
  lang: 'zh-CN' | 'en-US';
  backgroundType: 0 | 1 | 2;
  isDirectLink: boolean;
  chooseEngine: string;
  websiteList: WebsiteList[];
  pageSize: number;
};

export type Model = {
  num: number;
  name: string;
  value: boolean;
};
