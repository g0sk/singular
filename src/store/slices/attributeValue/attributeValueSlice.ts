import {createSlice} from '@reduxjs/toolkit';
import {AttributeValueState} from 'types';
import {fetchAttributeValues} from 'store/slices/attributeValue/attributeValueAsyncThunk';
const initialState: AttributeValueState = {
  attributeValue: null,
  attributeValues: [],
  loading: false,
  error: false,
};

const attributeValueSlice = createSlice({
  name: 'attributeValue',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAttributeValues.fulfilled, (state, action) => {
        state.attributeValues = [...action.payload];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchAttributeValues.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAttributeValues.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default attributeValueSlice.reducer;
