import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserConfig } from '@/types'; // 导入 UserConfig 类型
import config from '@/utils/config'; // 导入默认配置

// 获取默认配置
const initialState: UserConfig = config;

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<0 | 1>) => {
      state.model = action.payload;
    },
    setTheme: (state, action: PayloadAction<'system' | 'light' | 'dark'>) => {
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
  },
});

export const { setModel, setTheme, setLang, setBackgroundType } =
  configSlice.actions;
export default configSlice.reducer;
