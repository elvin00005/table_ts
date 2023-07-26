import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Posts {
  userId?: number;
  id: number;
  title: string;
  body: string;
  [key: string]: any;
}
export interface InitialState {
  posts: Posts[] | [];
}

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();
  return data;
});

const initialState: { posts: Posts[]; loading: boolean } = {
  posts: [],
  loading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      });
  },
});

export default postsSlice.reducer;
