// import { useGetLoggedUserQuery } from "../../redux/features/baseApi";
// import { useNavigate } from "react-router-dom";

// const Auto_Narative_Video = () => {
//   const { data: loggedInUser } = useGetLoggedUserQuery();
//   const navigate = useNavigate();

//   const hasPricing_plan = loggedInUser?.subscription_plan;

//   const handleNextClick = () => {
//     if (hasPricing_plan) {
//       navigate("/veteran_information");
//     } else {
//       navigate("/subscription");
//     }
//   };

//   return (
//     <div className=" bg-[#0A3161] text-white flex flex-col items-center justify-center p-6 md:py-48 py-32">
//       <h1 className="text-3xl font-bold mb-5 text-center">Watch This Important Video</h1>
//       <p className="md:text-lg text-center max-w-2xl mb-5">
//         This video provides essential guidance about your next steps. Make sure to watch it fully before proceeding.
//       </p>

//       <div className="w-full max-w-5xl aspect-video mb-5">
//         <iframe
//           className="w-full h-full rounded"
//           src="https://www.youtube.com/embed/1lRK_AFhlv0?si=rG4sj6UxAtVfeZWj"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           referrerPolicy="strict-origin-when-cross-origin"
//           allowFullScreen
//         ></iframe>
//       </div>

//       <button
//         type="button"
//         onClick={handleNextClick}
//         className="bg-[#B31942] text-white px-20 py-2 rounded"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Auto_Narative_Video;


import { useGetLoggedUserQuery } from "../../redux/features/baseApi";
import { useNavigate } from "react-router-dom";

const Auto_Narative_Video = () => {
  const { data: loggedInUser } = useGetLoggedUserQuery();
  const navigate = useNavigate();

  const hasPricing_plan = loggedInUser?.subscription_plan;

  const handleNextClick = () => {
    if (hasPricing_plan) {
      navigate("/veteran_information");
    } else {
      navigate("/subscription");
    }
  };

  return (
    <div className="bg-[#0A3161] text-white flex flex-col items-center justify-center px-2 py-20 md:pt-36 pt-36">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Watch This Important Video
      </h1>
      <p className="md:text-lg text-center max-w-2xl mb-5">
        This video provides essential guidance about your next steps. Make sure to watch it fully before proceeding.
      </p>

      <div className="w-full max-w-5xl aspect-video mb-8 flex justify-center">
        <iframe
          className="w-full h-full rounded"
          src="https://www.youtube.com/embed/1lRK_AFhlv0?si=rG4sj6UxAtVfeZWj"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <button
        type="button"
        onClick={handleNextClick}
        className="bg-[#B31942] text-white px-10 md:px-20 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Auto_Narative_Video;
