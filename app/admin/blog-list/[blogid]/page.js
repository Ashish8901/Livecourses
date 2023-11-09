import EditBlog from "@/components/AdminComponents/BlogComponent/EditBlog";

const page = ({ params }) => {
  return <EditBlog blogId={params.blogid} />;
};

export default page;
