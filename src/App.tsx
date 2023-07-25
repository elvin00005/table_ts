import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyTable from "./components/myTable/MyTable";

import { Posts, getAllPosts } from "./store/postsSlice";
import { AppDispatch } from "./store";
import Pagination from "./components/pagination/Pagination";
import styles from "./App.module.scss";
import Filter from "./components/filter/Filter";
import usePagination from "./hooks/usePagination";

interface RootState {
  posts: Posts[];
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { posts } = useSelector((state: RootState) => state);

  const [filteredPosts, setFilteredPosts] = useState<Posts[]>(posts);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const { currentPage, postsPerPage, currentPosts, paginate, setCurrentPage } =
    usePagination({ filteredPosts });
  return (
    <div className={styles.container}>
      <Filter
        posts={posts}
        onFilter={(filtered) => setFilteredPosts(filtered)}
      />
      <MyTable posts={currentPosts} />
      <Pagination
        somethingPerPage={postsPerPage}
        totalSomething={filteredPosts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}
export default App;
