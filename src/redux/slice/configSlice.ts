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

const saveConfigToStorage = (value: UserConfig) => {
  if (value) {
    // chrome.storage.local.clear();
    chrome.storage.sync.get(['configs'], (result) => {
      if (result.configs) {
        const configList = result.configs;
        configList.unshift(value);
        if (configList.length > 5) {
          configList.pop();
        }
        chrome.storage.sync.set({ configs: configList }, () => {
          console.log('配置已同步到Chrome', configList);
        });
      } else {
        chrome.storage.sync.set({ configs: [value] }, () => {
          console.log('配置已同步到Chrome', value);
        });
      }
    });
  }
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<boolean>) => {
      state.isStandardModel = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setLang: (state, action: PayloadAction<'zh-CN' | 'en-US'>) => {
      state.lang = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setBackgroundType: (state, action: PayloadAction<0 | 1 | 2>) => {
      state.backgroundType = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setLinkMode: (state, action: PayloadAction<boolean>) => {
      state.isDirectLink = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setChooseEngine: (state, action: PayloadAction<string>) => {
      state.chooseEngine = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setWebsiteList: (state, action: PayloadAction<WebsiteList[]>) => {
      state.websiteList = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      const config = { ...state };
      saveConfigToStorage(config);
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
