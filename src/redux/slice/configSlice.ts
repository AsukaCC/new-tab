import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserConfig, WebsiteList } from '@/types'; // 导入 UserConfig 类型
import { initWebsites } from '@/utils/websiteList';

// 获取默认配置
const initialState: UserConfig = {
  isStandardModel: true,
  theme: null,
  lang: 'zh-CN',
  backgroundType: 0,
  isDirectLink: true,
  chooseEngine: 'default',
  websiteList: initWebsites,
  pageSize: 12,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<boolean>) => {
      state.isStandardModel = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLang: (state, action: PayloadAction<'zh-CN' | 'en-US'>) => {
      state.lang = action.payload;
    },
    setBackgroundType: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.backgroundType = action.payload;
    },
    setLinkMode: (state, action: PayloadAction<boolean>) => {
      state.isDirectLink = action.payload;
    },
    setChooseEngine: (state, action: PayloadAction<string>) => {
      state.chooseEngine = action.payload;
    },
    setWebsiteList: (state, action: PayloadAction<WebsiteList[]>) => {
      state.websiteList = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setModel,
  setTheme,
  setLang,
  setBackgroundType,
  setLinkMode,
  setChooseEngine,
  setWebsiteList,
  setPageSize,
} = configSlice.actions;
export default configSlice.reducer;
