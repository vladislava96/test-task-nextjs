import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { fetchSlides } from "./slidesAPI";

export interface Slide {
  id: string;
  title: string;
  content: string;
  index: number;
}

const slidesAdapter = createEntityAdapter({
  selectId: (slide: Slide) => slide.id,
  sortComparer: (a, b) => a.index > b.index ? 1 : -1
})

const initialState = slidesAdapter.getInitialState({
  description: '',
  status: "idle"
})

export const fetchSlidesAsync = createAsyncThunk(
  "generation/fetchSlides",
  async () => {
    const response = await fetchSlides();
    return response;
  }
);

export const slidesSlice = createAppSlice({
  name: "generation",
  initialState,
  reducers: {
    setPresentationDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    slideAdded: slidesAdapter.addOne,
    slideRemoved: slidesAdapter.removeOne,
    slideUpdate: slidesAdapter.updateOne,
    slidesUpdate: slidesAdapter.setAll
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSlidesAsync.pending, (state) => {
        state.status = "loading";
      });
    builder.addCase(fetchSlidesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        slidesAdapter.setAll(state, action.payload)
      });
    builder.addCase(fetchSlidesAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
  selectors: {
    selectSlides: slidesAdapter.getSelectors().selectAll,
    selectStatus: (generation) => generation.status,
    selectNextIndex: (generation) => slidesAdapter.getSelectors().selectTotal(generation) + 1 
  },
});

export const { setPresentationDescription, slideAdded, slideRemoved, slideUpdate, slidesUpdate } = slidesSlice.actions;

export const { selectSlides, selectStatus, selectNextIndex } = slidesSlice.selectors;