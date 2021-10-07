import {createSlice} from '@reduxjs/toolkit';
import {CustomAttributeState} from 'types';
import {
  createCustomAttribute,
  fetchCustomAttributes,
} from 'store/slices/customAttribute/customAttributeAsyncThunk';
const initialState: CustomAttributeState = {
  customAttribute: null,
  customAttributes: [],
  loading: false,
  error: false,
};

const customAttributeSlice = createSlice({
  name: 'customAttribute',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(createCustomAttribute.fulfilled, (state, action) => {
        state.customAttribute = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(createCustomAttribute.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createCustomAttribute.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchCustomAttributes.fulfilled, (state, action) => {
        state.customAttributes = [...action.payload];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchCustomAttributes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCustomAttributes.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default customAttributeSlice.reducer;
