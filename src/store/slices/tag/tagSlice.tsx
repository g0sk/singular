import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TagState} from 'types';
import {TagInfo} from 'types';

const initialState: TagState = {
  lastTag: null,
  time: null,
};

const tagSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    updateLastTag: (state, action: PayloadAction<TagInfo>) => {
      if (action.payload !== null) {
        state.lastTag = {...action.payload};
        state.time = new Date();
      }
    },
  },
});

export default tagSlice.reducer;
export const {updateLastTag} = tagSlice.actions;
