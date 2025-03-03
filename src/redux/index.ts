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
import storage from 'redux-persist/lib/storage'; // localStorage
import configReducer from './slice/configSlice'; // configSlice
import userReducer from './slice/userSlice'; // userSlice
import stateReducer from './slice/stateSlice'; // stateSlice

// 配置 persist
const persistConfig = {
  key: 'new-tab-config',
  storage,
};

// 创建一个持久化的 reducer
const configReducerPersist = persistReducer(persistConfig, configReducer);
const userReducerPersist = persistReducer(persistConfig, userReducer);

// 配置 Redux store
const store = configureStore({
  reducer: {
    config: configReducerPersist,
    user: userReducerPersist,
    state: stateReducer,
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
