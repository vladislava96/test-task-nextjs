import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { fetchPresentationDescription, fetchSlides } from "./slidesAPI";

export interface Slide {
  id: string;
  title: string;
  content: string;
}

const slidesAdapter = createEntityAdapter({
  selectId: (slide: Slide) => slide.id
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

// export const fetchPresentationDescriptionAsync = createAsyncThunk(
//   "generation/fetchPresentationDescription",
//   async (description: string) => {
//     const response = await fetchPresentationDescription(description);
//     return response;
//   }
// );

export const slidesSlice = createAppSlice({
  name: "generation",
  initialState,
  reducers: (create) => ({
    setPresentationDescription: create.reducer((state, action: PayloadAction<string>) => {
      state.description = action.payload;
    }),
  }),
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
    // builder.addCase(fetchPresentationDescriptionAsync.pending, (state) => {
    //     state.status = "loading";
    //   });
    // builder.addCase(fetchPresentationDescriptionAsync.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.description = action.payload;
    //   });
    // builder.addCase(fetchPresentationDescriptionAsync.rejected, (state) => {
    //     state.status = "failed";
    //   });
  },
  selectors: {
    selectSlides: slidesAdapter.getSelectors().selectAll,
    selectStatus: (generation) => generation.status,
  },
});

export const { setPresentationDescription } = slidesSlice.actions;

export const { selectSlides, selectStatus } = slidesSlice.selectors;