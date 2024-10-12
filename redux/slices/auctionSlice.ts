import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuctionState {
  latestAuctionId: string | null;
  auctionDetails: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuctionState = {
  latestAuctionId: null,
  auctionDetails: null,
  loading: false,
  error: null,
};

// Async thunk to fetch latest auction ID
export const fetchLatestAuctionId = createAsyncThunk(
  'auction/fetchLatestAuctionId',
  async () => {
    const response = await axios.get('/api/auctions/latest-auction-id');
    console.log('auction latest id: ' + response.data.auction_id);
    return response.data.auction_id;
  }
);

// Async thunk to fetch auction details
export const fetchAuctionDetails = createAsyncThunk(
  'auction/fetchAuctionDetails',
  async (auctionId: string) => {
    const response = await axios.post('/api/auctions/auction-details', { auction_id: auctionId });
    return response.data;
  }
);

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestAuctionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestAuctionId.fulfilled, (state, action) => {
        state.latestAuctionId = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestAuctionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch latest auction ID';
      })
      .addCase(fetchAuctionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuctionDetails.fulfilled, (state, action) => {
        state.auctionDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchAuctionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch auction details';
      });
  },
});

export default auctionSlice.reducer;