import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyTable from "./components/myTable/MyTable";
import { Post, getAllPosts } from "./store/postsSlice";
import { AppDispatch } from "./store";
import Pagination from "./components/pagination/Pagination";
import Filter from "./components/filter/Filter";
import usePagination from "./hooks/usePagination";
import filtering from "./hooks/filtering";

import styles from "./App.module.scss";

interface RootState {
  posts: { posts: Post[]; loading: boolean };
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { loading, posts } = useSelector((state: RootState) => state.posts);
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredPosts = useMemo(
    () =>
      filtering(posts, {
        searchValue,
      }),
    [searchValue, posts]
  );

  const { currentPage, postsPerPage, currentPosts, paginate, setCurrentPage } =
    usePagination({ filteredPosts });

  return (
    <div className={styles.container}>
      <Filter
        posts={posts}
        onFilter={(text: string) => setSearchValue(text)}
        searchValue={searchValue}
      />
      <MyTable posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalSomething={filteredPosts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}
