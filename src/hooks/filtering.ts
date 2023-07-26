import { Post } from "../store/postsSlice";

type filterOptions = {
  searchValue?: string;
};
export default function filtering(
  posts: Post[],
  { searchValue }: filterOptions = {}
) {
  return posts.filter((post) => {
    const lowerCaseSearchValue = searchValue?.toLowerCase() || "";
    if (!lowerCaseSearchValue) return true;

    return (
      post.title.toLowerCase().includes(lowerCaseSearchValue) ||
      post.id.toString().includes(lowerCaseSearchValue) ||
      post.body.toLowerCase().includes(lowerCaseSearchValue)
    );
  });
}
