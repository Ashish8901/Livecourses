import SingleBlogPage from "@/components/UserComponents/Blogs/SingleBlogPage";

export default function BlogDetails({ params }) {
  const { blogId } = params;

  return (
    <>
      <SingleBlogPage blogId={blogId} />
    </>
  );
}
