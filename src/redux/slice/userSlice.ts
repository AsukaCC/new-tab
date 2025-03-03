import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/types'; // 导入 UserConfig 类型

const initialState: UserInfo = {
  email: '',
  email_verified: false,
  family_name: '',
  given_name: '',
  name: '',
  picture: '',
  sub: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      // 直接修改 state 的属性
      state.email = action.payload.email;
      state.email_verified = action.payload.email_verified;
      state.family_name = action.payload.family_name;
      state.given_name = action.payload.given_name;
      state.name = action.payload.name;
      state.picture = action.payload.picture;
      state.sub = action.payload.sub;
    },
    setNull: () => {
      return initialState;
    },
  },
});

export const { setUser, setNull } = userSlice.actions;
export default userSlice.reducer;
