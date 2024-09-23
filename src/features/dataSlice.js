import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  // console.log('fetch data');
  const response = await fetch('http://localhost:8000/api/get-image-url');
  const data = await response.json();
  // console.log(data);
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    activeItemIndex: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    setActiveItemIndex(state, action) {
      // console.log(action);
      state.activeItemIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { setActiveItemIndex } = dataSlice.actions;
export default dataSlice.reducer;
