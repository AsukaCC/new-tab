import { State } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 获取默认配置
const initialState: State = {
  isEditing: false,
  isAdding: false,
  isOpening: false,
  showPage: 0,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
      state.isAdding = false;
      state.isOpening = false;
    },
    setIsAdding: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
      state.isEditing = false;
      state.isOpening = false;
    },
    setIsOpening: (state, action: PayloadAction<boolean>) => {
      state.isOpening = action.payload;
      state.isEditing = false;
      state.isAdding = false;
    },
    setShowPage: (state, action: PayloadAction<number>) => {
      state.showPage = action.payload;
    },
  },
});

export const { setIsEditing, setIsAdding, setIsOpening, setShowPage } =
  stateSlice.actions;
export default stateSlice.reducer;
