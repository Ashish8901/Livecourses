import { Suspense } from "react";
import AllBlogPage from "../../components/UserComponents/Blogs/AllBlogPage";
import Loading from "./loading";

export default function Blogs() {
  return (
    <Suspense fallback={<Loading />}>
      <AllBlogPage />
    </Suspense>
  );
}
