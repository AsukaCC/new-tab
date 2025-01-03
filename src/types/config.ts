export type UserConfig = {
  model: 0 | 1;
  theme: 'system' | 'light' | 'dark';
  lang: 'zh-CN' | 'en-US';
  backgroundType: 0 | 1 | 2;
  isDirectLink: boolean;
};

export type Model = {
  name: string;
  value: 0 | 1;
};
