import { Link } from "react-router-dom";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  somethingPerPage: number;
  totalSomething: number;
  setCurrentPage: (n: number | ((prev: number) => number)) => void;
  currentPage: number;
  paginate(n: number): void;
}
const Pagination = ({
  somethingPerPage,
  totalSomething,
  setCurrentPage,
  currentPage,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalSomething / somethingPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
    setCurrentPage((prev: number) => {
      if (prev - 1 === 0) {
        return (prev = 1);
      } else {
        return prev - 1;
      }
    });
  };
  const nextPage = () => {
    setCurrentPage((prev: number) => {
      if (prev + 1 === pageNumbers.length + 1) {
        return (prev = pageNumbers.length);
      } else {
        return prev + 1;
      }
    });
  };
  return (
    <div className={styles.container}>
      <button onClick={() => prevPage()}>Назад</button>
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              onClick={() => {
                paginate(number);
              }}
            >
              <div>
                <Link
                  to="#"
                  className={currentPage === number ? styles.activeBtn : ""}
                >
                  {number}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <button onClick={() => nextPage()}>Далее</button>
    </div>
  );
};

export default Pagination;
