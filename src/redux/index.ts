import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import configReducer from './slice/configSlice'; // 引入你的 configSlice

// 配置 persist
const persistConfig = {
  key: 'new-tab-config',
  storage,
};

// 创建一个持久化的 reducer
const persistedReducer = persistReducer(persistConfig, configReducer);

// 配置 Redux store
const store = configureStore({
  reducer: {
    config: persistedReducer, // 使用持久化的 reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store); // 创建持久化存储对象

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
