import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Posts {
  userId?: number;
  id: number;
  title: string;
  body: string;
}
export interface InitialState {
  posts: Posts[] | [];
}

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();
  return data;
});

const initialState: Posts[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default postsSlice.reducer;
