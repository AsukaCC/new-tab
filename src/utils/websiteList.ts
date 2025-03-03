import { Website } from '@/types';

const initWebsites: [Website[]] = [
  [
    {
      name: 'DeepSeek',
      url: 'https://deepseek.com',
      category: 'AI',
      description: '深度求索是一家专注于人工智能技术研究和应用的公司',
    },
    {
      name: '网易云音乐',
      url: 'https://music.163.com',
      category: '音乐',
      description: '中国知名的音乐流媒体平台',
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      category: '技术',
      description: '全球最大的代码托管平台',
    },
    {
      name: '掘金',
      url: 'https://juejin.cn',
      category: '技术',
      description: '中国开发者的技术分享社区',
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com',
      category: '工具',
      description: '设计师创意社区',
    },
    {
      name: 'Bilibili',
      url: 'https://bilibili.com',
      category: '视频',
      description: '年轻人喜爱的二次元平台',
    },
  ],
];

const websites: Website[] = [
  // 音乐类
  {
    name: '网易云音乐',
    url: 'https://music.163.com',
    category: '音乐',
    description: '中国知名的音乐流媒体平台',
  },
  {
    name: 'QQ音乐',
    url: 'https://y.qq.com',
    category: '音乐',
    description: '腾讯推出的音乐平台',
  },
  {
    name: '酷狗音乐',
    url: 'https://www.kugou.com',
    category: '音乐',
    description: '广受欢迎的音乐播放器',
  },
  {
    name: '酷我音乐',
    url: 'https://www.kuwo.cn',
    category: '音乐',
    description: '提供高品质音乐的播放器',
  },
  {
    name: 'Spotify',
    url: 'https://www.spotify.com',
    category: '音乐',
    description: '全球领先的音乐流媒体平台',
  },
  {
    name: 'Apple Music',
    url: 'https://www.apple.com/music',
    category: '音乐',
    description: '苹果推出的音乐平台',
  },
  {
    name: 'YouTube Music',
    url: 'https://music.youtube.com',
    category: '音乐',
    description: 'YouTube的音乐平台',
  },
  {
    name: 'Amazon Music',
    url: 'https://music.amazon.com',
    category: '音乐',
    description: '亚马逊提供的音乐服务',
  },
  {
    name: 'Tidal',
    url: 'https://www.tidal.com',
    category: '音乐',
    description: '高保真音质音乐平台',
  },

  // 视频类
  {
    name: 'Bilibili',
    url: 'https://bilibili.com',
    category: '视频',
    description: '年轻人喜爱的二次元平台',
  },
  {
    name: '优酷',
    url: 'https://www.youku.com',
    category: '视频',
    description: '阿里巴巴旗下视频平台',
  },
  {
    name: '爱奇艺',
    url: 'https://www.iqiyi.com',
    category: '视频',
    description: '领先的在线视频平台',
  },
  {
    name: '腾讯视频',
    url: 'https://v.qq.com',
    category: '视频',
    description: '腾讯推出的视频平台',
  },
  {
    name: '芒果TV',
    url: 'https://www.mgtv.com',
    category: '视频',
    description: '湖南卫视的在线视频平台',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com',
    category: '视频',
    description: '全球最大的视频平台',
  },
  {
    name: '抖音',
    url: 'https://www.douyin.com',
    category: '视频',
    description: '全球领先的视频分享平台',
  },
  {
    name: 'Twitch',
    url: 'https://www.twitch.tv',
    category: '视频',
    description: '主要用于游戏直播的平台',
  },
  {
    name: 'Netflix',
    url: 'https://www.netflix.com',
    category: '视频',
    description: '全球最大的视频点播平台',
  },

  // 技术类
  {
    name: 'GitHub',
    url: 'https://github.com',
    category: '技术',
    description: '全球最大的代码托管平台',
  },
  {
    name: '掘金',
    url: 'https://juejin.cn',
    category: '技术',
    description: '中国开发者的技术分享社区',
  },
  {
    name: 'CSDN',
    url: 'https://www.csdn.net',
    category: '技术',
    description: '专业的技术社区平台',
  },
  {
    name: 'SegmentFault',
    url: 'https://segmentfault.com',
    category: '技术',
    description: '面向开发者的问答社区',
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    category: '技术',
    description: '全球最大的开发者问答社区',
  },
  {
    name: 'GitLab',
    url: 'https://gitlab.com',
    category: '技术',
    description: '代码托管与CI/CD平台',
  },
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    category: '技术',
    description: '技术新闻与创投的论坛',
  },
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com',
    category: '技术',
    description: '全球科技新闻平台',
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com',
    category: '技术',
    description: '全球科技文化新闻',
  },

  // 购物类
  {
    name: '京东',
    url: 'https://www.jd.com',
    category: '购物',
    description: '中国领先的综合购物平台',
  },
  {
    name: '淘宝网',
    url: 'https://www.taobao.com',
    category: '购物',
    description: '中国的网上购物平台',
  },
  {
    name: '天猫',
    url: 'https://www.tmall.com',
    category: '购物',
    description: '阿里巴巴旗下购物平台',
  },
  {
    name: '拼多多',
    url: 'https://www.pinduoduo.com',
    category: '购物',
    description: '社交电商平台',
  },
  {
    name: '苏宁易购',
    url: 'https://www.suning.com',
    category: '购物',
    description: '综合电商平台',
  },
  {
    name: 'Amazon',
    url: 'https://www.amazon.com',
    category: '购物',
    description: '全球最大的购物平台',
  },
  {
    name: 'eBay',
    url: 'https://www.ebay.com',
    category: '购物',
    description: '全球最大的在线拍卖平台',
  },
  {
    name: 'Walmart',
    url: 'https://www.walmart.com',
    category: '购物',
    description: '全球零售购物平台',
  },
  {
    name: 'AliExpress',
    url: 'https://www.aliexpress.com',
    category: '购物',
    description: '全球知名的跨境购物平台',
  },
  {
    name: 'Etsy',
    url: 'https://www.etsy.com',
    category: '购物',
    description: '全球手工艺品与古董购物平台',
  },

  // AI类
  {
    name: 'DeepSeek',
    url: 'https://deepseek.com',
    category: 'AI',
    description: '深度求索是一家专注于人工智能技术研究和应用的公司',
  },
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com',
    category: 'AI',
    description: 'ChatGPT是一款基于人工智能的聊天机器人',
  },
  {
    name: 'Claude',
    url: 'https://claude.ai',
    category: 'AI',
    description: 'Claude是一款基于人工智能的聊天机器人',
  },
];

export { initWebsites, websites };
