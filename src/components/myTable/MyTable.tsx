import { useState } from "react";
import { Table } from "react-bootstrap";
import { Post } from "../../store/postsSlice";
import ArrowImg from "../ArrowImg";

import styles from "./MyTable.module.scss";

interface MyTableProps {
  posts: Post[];
  loading: boolean;
}

const MyTable = ({ posts, loading }: MyTableProps) => {
  const [sortKey, setSortKey] = useState<keyof Post | "">("");
  const [isReversed, setIsReversed] = useState<boolean>(false);

  if (loading) {
    return <h1 className="text-center m-5">Loading...</h1>;
  }
  if (posts.length <= 0) {
    return <h1 className="text-center m-5">No posts found...</h1>;
  }

  const reverse = (key: string) => {
    if (sortKey === key) {
      setIsReversed((prevState) => !prevState);
    } else {
      setSortKey(key);
      setIsReversed(false);
    }
  };

  const sortedPosts = () => {
    if (!sortKey) {
      return posts;
    }

    const sorted = [...posts].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return isReversed ? 1 : -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return isReversed ? -1 : 1;
      }
      return 0;
    });

    return sorted;
  };

  return (
    <Table hover bordered className={styles.wrapper}>
      <thead>
        <tr>
          <th className={styles.id}>
            ID <ArrowImg onClick={() => reverse("id")} />
          </th>
          <th className={styles.titleHeader}>
            Заголовок <ArrowImg onClick={() => reverse("title")} />
          </th>
          <th className={styles.description}>
            Описание <ArrowImg onClick={() => reverse("body")} />
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedPosts().map((post) => {
          return (
            <tr key={post.id} className={styles.body}>
              <td className="text-center">{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MyTable;
