import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyTable from "./components/myTable/MyTable";

import { Posts, getAllPosts } from "./store/postsSlice";
import { AppDispatch } from "./store";
import Pagination from "./components/pagination/Pagination";
import Filter from "./components/filter/Filter";
import usePagination from "./hooks/usePagination";

import styles from "./App.module.scss";

interface RootState {
  posts: { posts: Posts[]; loading: boolean };
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { loading, posts } = useSelector((state: RootState) => state.posts);

  const [filteredPosts, setFilteredPosts] = useState<Posts[]>(posts);
  const { currentPage, postsPerPage, currentPosts, paginate, setCurrentPage } =
    usePagination({ filteredPosts });
  const [searchValue, setSearchValue] = useState<string>("");

  const handleFilter = (searchValue: string) => {
    setSearchValue(searchValue);
    const filteredPosts = posts.filter((post) => {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return (
        post.title.toLowerCase().includes(lowerCaseSearchValue) ||
        post.id.toString().includes(lowerCaseSearchValue) ||
        post.body.toLowerCase().includes(lowerCaseSearchValue)
      );
    });
    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    handleFilter(searchValue);
    setCurrentPage(1);
  }, [searchValue, posts]);

  return (
    <div className={styles.container}>
      <Filter
        posts={posts}
        onFilter={(text: string) => setSearchValue(text)}
        searchValue={searchValue}
      />
      <MyTable posts={currentPosts} loading={loading} />
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
