export type Website = {
  name: string;
  url: string;
  category:
    | '社交'
    | '娱乐'
    | '音乐'
    | '视频'
    | '技术'
    | 'AI'
    | '工具'
    | '新闻'
    | '美食'
    | '旅游'
    | '购物'
    | '汽车'
    | '宠物';
  description: string;
  icon?: string;
};
export type WebsiteList = Website[];

export type SearchWebsite = {
  name: string;
  url: string;
  searchUrl: string;
};

export type SearchEngine = {
  key: string;
  name: string;
  favicon: string;
  searchFunction: (text: string) => void;
};
