"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl, title, description }) => {
  const isVideoAvailable = videoUrl && videoUrl.trim() !== "";

  return (
    <>
      {!isVideoAvailable && (
        <div className="video-player">
          <div className="purchase-banner text-center">
            <p>You need to purchase the course to access the videos.</p>
          </div>
          <h5>{title}</h5>
          <h6>{description}</h6>
        </div>
      )}
      {isVideoAvailable && (
        <div className="video-player">
          <ReactPlayer
            className="w-full video-full"
            url={`${process.env.NEXT_PUBLIC_API_URL}/${videoUrl}`}
            controls={true}
            volume={1}
          />
          <h5>{title}</h5>
          <h6>{description}</h6>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;












// "use client";
// import React from "react";
// import ReactPlayer from "react-player";
// const VideoPlayer = ({ videoUrl, onClick, title, description }) => {
//   return (
//     <>
//       <div
//         className="video-player"
//         // onClick={() => onClick(videoUrl, title, description)}
//       >
//         <ReactPlayer
//           className="w-full video-full"
//           url={`${process.env.NEXT_PUBLIC_API_URL}/${videoUrl}`}
//           controls={true}
//           volume={1}
//         />
//         <h5>{title}</h5>
//         <h6>{description}</h6>
//       </div>
//     </>
//   );
// };

// export default VideoPlayer;
