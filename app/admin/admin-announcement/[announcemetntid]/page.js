import EditAnnouncement from "@/components/AdminComponents/AnnouncementComponent/EditAnnouncements";

const page = ({ params }) => {
  return <EditAnnouncement AnnouncementId={params.announcemetntid} />;
};

export default page;
