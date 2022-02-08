import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const getDetailIdea = createAsyncThunk(
  "idea/ideaFetched",
  async (ideaId) => {
    const res = await Api().get(`/ideas/${ideaId}`);
    return res.data;
  }
);

export const getTotalLike = createAsyncThunk(
  "idea/totalLikeFetched",
  async (ideaId) => {
    const res = await Api().get(`/ideas/${ideaId}/likes`);
    return res.data;
  }
);

export const getCommentOfIdea = createAsyncThunk(
  "idea/comments/commentsFetched",
  async (ideaId) => {
    const res = await Api().get(`/ideas/${ideaId}/comments`);
    return res.data;
  }
);

const IdeaSlice = createSlice({
  name: "ideas",
  initialState: {
    idea: {},
    totalLike: 0,
    comments: [],
  },

  reducers: {
    // updateIdeaState(state, action) {
    //   state.idea = action.payload;
    // },
  },

  extraReducers: {
    [getDetailIdea.fulfilled]: (state, action) => {
      //   console.log(action.payload);
      state.idea = action.payload;
    },
    [getTotalLike.fulfilled]: (state, action) => {
      state.totalLike = action.payload;
    },
    [getCommentOfIdea.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
  },
});

// selector
export const ideaSelector = (state) => state.ideasReducer.idea;
export const totalLikeOfIdeaSelector = (state) => state.ideasReducer.totalLike;
export const commentIdeaSelector = (state) => state.ideasReducer.comments;
// Reducer
export const ideasReducer = IdeaSlice.reducer;

// Action export
