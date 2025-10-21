import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetLoggedUserQuery } from "../../redux/features/baseApi";

const FeaturesCard = () => {
  const { data: loggedInUser, isLoading } = useGetLoggedUserQuery();

  if (isLoading || !loggedInUser) {
    return null;
  }

  return (
    <div
      id="features"
      className="bg-[#E0F7FF] dark:bg-[#E0F7FF] md:pt-10 md:pb-10 "
    >
      <div className="md:bg-[url('https://i.ibb.co/mV4kpQdX/Group-1.png')] bg-cover bg-center bg-no-repeat min-h-[50vh] md:min-h-[90vh]">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-8 min-h-[50vh] md:min-h-[90vh] px-4 md:px-0">
          {/* Image Section (Moved to bottom,on mobile, left on md) */}
          <div className="basis-full md:basis-8/12 flex justify-center md:justify-center mt-6 md:mt-6 order-2 md:order-1">
            <img
              src="https://i.ibb.co/V0H3JRyk/Group-2147226323.png"
              className=" h-auto w-full md:w-[900px] md:h-[800px] mt-7"
              alt="Features Graphic"
            />
          </div>

          {/* Text Content Section */}
          <div className="basis-full md:basis-6/12 px-0 md:px-10 space-y-6  md:mt-20  md:space-y-14 pt-10 md:pt-0 order-1 md:order-2">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#0B2A52] text-center md:text-start">
                Unmatched Experience
              </h1>
              <p className="pt-3 text-gray-500 text-sm md:text-base text-center md:text-start">
                With decades of experience, we’ve helped thousands of veterans
                secure their benefits. No case is too complex for our team.
              </p>
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#0B2A52] text-center md:text-start">
                Turn Your Disabilities Into Possibilities
              </h1>
              <p className="pt-3 text-gray-500 text-sm md:text-base text-center md:text-start">
                We transform the challenges of navigating the VA system into a
                clear path toward the benefits you deserve.
              </p>
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#0B2A52] text-center md:text-start">
                100% Success Rate
              </h1>
              <p className="pt-3 text-gray-500 text-sm md:text-base text-center md:text-start">
                We’ve never failed to achieve our clients’ goals. Every veteran
                we’ve worked with has seen results.
              </p>
            </div>

            <div className="group flex items-center bg-red-500 w-[240px] md:w-[280px] rounded-md cursor-pointer shadow-lg shadow-gray-500 overflow-hidden transform transition-transform duration-300 hover:-translate-y-1 mx-auto lg:mx-0">
              <Link
                to="/narrative"
                className="px-4 md:px-5 py-3 md:py-4 text-white text-base md:text-lg font-semibold uppercase"
              >
                Start Your Claim
              </Link>
              <div className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 pr-4">
                <FaArrowRightLong size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;
