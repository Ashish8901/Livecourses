import UserView from "@/components/AdminComponents/UserComponent/UserView";

const page = ({ params }) => {
  return <UserView userId={params.userId} />;
};

export default page;
