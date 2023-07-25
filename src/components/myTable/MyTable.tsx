import React from "react";
import { Table } from "react-bootstrap";
import { Posts } from "../../store/postsSlice";
import ArrowImg from "../ArrowImg";

import styles from "./MyTable.module.scss";

interface MyTableProps {
  posts: Posts[];
}

const MyTable = ({ posts }: MyTableProps) => {
  if (posts.length <= 0) {
    return <h1 className="text-center m-5">Loading...</h1>;
  }
  return (
    <Table hover bordered className={styles.wrapper}>
      <thead>
        <tr>
          <th className={styles.id}>
            ID <ArrowImg />
          </th>
          <th className={styles.titleHeader}>
            Заголовок
            <ArrowImg />
          </th>
          <th className={styles.description}>
            Описание <ArrowImg />
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => {
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
