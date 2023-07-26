import { useState } from "react";
import { Posts } from "../store/postsSlice";

export default function usePagination({
  filteredPosts,
}: {
  filteredPosts: Posts[] | [];
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const lastIndexUser = currentPage * postsPerPage;
  const firstIndexUser = lastIndexUser - postsPerPage;
  const currentPosts = filteredPosts?.slice(firstIndexUser, lastIndexUser);
  const paginate = (number: number) => setCurrentPage(number);

  return { currentPage, postsPerPage, currentPosts, paginate, setCurrentPage };
}
