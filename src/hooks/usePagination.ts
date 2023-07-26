import { useEffect, useState } from "react";
import { Post } from "../store/postsSlice";
import { useSearchParams } from "react-router-dom";

export default function usePagination({
  filteredPosts,
}: {
  filteredPosts: Post[] | [];
}) {
  const [search] = useSearchParams();
  const p = parseInt(search.get("page") || "") || 1;
  const [currentPage, setCurrentPage] = useState(p);
  const [postsPerPage] = useState<number>(10);
  const lastIndexUser = Number(currentPage) * postsPerPage;
  const firstIndexUser = lastIndexUser - postsPerPage;
  const currentPosts = filteredPosts?.slice(firstIndexUser, lastIndexUser);
  const paginate = (number: number) => setCurrentPage(number);

  useEffect(() => {
    const newPage = parseInt(search.get("page") || "") || 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [search, currentPage]);
  return { currentPage, postsPerPage, currentPosts, paginate, setCurrentPage };
}
