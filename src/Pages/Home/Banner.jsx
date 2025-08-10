import { useSelector } from "react-redux";
import giff_2 from "../../assets/giff_2.mp4"


const Banner = () => {
  const user = useSelector((state) => state.chatSlice.user);
  const hasSubscription = user?.subscription_plan;

  return (
    <section className="relative">
      {/* ===== Desktop & Tablet View ===== */}
      <div
        className="hidden md:flex bg-cover bg-center bg-no-repeat min-h-auto items-center justify-between "
        style={{
          backgroundImage: "url('https://i.ibb.co/J4JZy4Y/Desktop-9.jpg')",
        }}
      >
        <div className="relative md:flex items-center justify-between mx-auto w-full py-24 pt-44">
          {/* Left Content */}
          <div className="relative z-10 w-auto max-w-[900px] ">
            {!user || !hasSubscription ? (
              <>
                <div className="">
                  <div className="bg-[#FFFFFF] rounded-tr-[50px] shadow-lg container px-20">
                    <div className="py-3">
                      <h1 className="text-[#003794]  text-center md:text-start pt-56 md:pt-0 text-3xl md:text-5xl font-bold leading-relaxed md:leading-[5rem]">
                        Submit your VA <br /> Disability claim <br /> today with{" "}
                        <span className="font-extrabold text-7xl">VALR</span>
                      </h1>
                    </div>
                  </div>
                  <div className="bg-[#B31942] py-6 rounded-br-[20px]">
                    <h1 className="container text-white font-bold text-6xl px-20">
                      For only $195*
                    </h1>
                  </div>
                  <div className="container py-10 px-20">
                    <p className="text-[#25456F] text-base font-semibold w-11/12 leading-relaxed md:leading-[1.8rem] ">
                      Tired of delays, paperwork, and confusion? VALR makes
                      filing your VA claim fast and stress-free. Our system is
                      built to help you get every dollar and benefit you
                      deserve—quickly, clearly, and without the usual hassle. No
                      stress. No confusion. Just results.
                    </p>
                    <p className="text-[#25456F] mt-5 font-extrabold text-lg md:text-xl w-10/12 leading-relaxed md:leading-[2rem]">
                      no stress. NO CONFUSION. JUST RESULTS.
                    </p>
                  </div>
                  <div className="uppercase font-semibold mt-3 container px-20">
                    <a
                      href="/#pricing_plan"
                      to="/plan"
                      className="uppercase text-3xl bg-[#003794] text-[#FFFFFF] p-4 px-10 rounded-md"
                    >
                      get started!
                    </a>
                  </div>
                </div>
              </>
            ) : (
              // If logged in & has subscription, show this block
              <div>
                <div className="bg-white rounded-r-[30px] shadow-lg border border-gray-200 py-12 mt-10">
                  <div className="ms-0  py-10 px-4 md:px-0">
                    <h2 className="text-3xl px-20 md:text-4xl font-bold text-[#003794] uppercase leading-tight">
                      Let’s Get Your
                      <br />
                      <span className="text-[#003794] text-5xl md:text-9xl mt-4 inline-block">
                        Benefits
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="ms-0  py-10 px-20">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                    Congratulations! Finally, you’re one step closer to
                    receiving the benefits you’ve rightfully earned. Get the
                    support you deserve, with no more confusion and no more
                    waiting. It’s time to take control of your claim with
                    confidence and clarity.
                  </p>
                  <a
                    href="/#features"
                    className="bg-[#003794] text-white  font-semibold text-lg md:text-2xl px-6 py-4 md:py-5 rounded-md uppercase tracking-wide inline-block"
                  >
                    Start Your Claim Now!
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="relative z-10 basis-6/12 flex items-center justify-center ">
            <img
              src="https://i.ibb.co/4g0GjgTd/Rectangle-22205.png"
              loading="lazy"
              alt=""
              className="absolute -z-10 "
            />
            
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-[650px] max-w-full rounded-[50px]"
            >
              <source src={giff_2} type="video/mp4" />
              Your browser does not support this video.
            </video>
          </div>
        </div>
      </div>

      {/* ===== Mobile View ===== */}
      <div className="block min-h-screen pb-10 pt-32 md:hidden bg-[#E0F7FF] dark:bg-[#E0F7FF] text-center relative overflow-hidden">
        {!user || !hasSubscription ? (
          <>
            <p className="text-orange-500 px-2 text-lg  font-semibold tracking-wider uppercase mb-4 md:text-start text-center">
              welcome to <span className="font-bold text-[#003794]">VALR</span>
            </p>
            <h1 className="text-3xl font-bold text-[#003794] leading-tight px-2 md:text-start text-center">
              Submit your va
            </h1>
            <h1 className="text-3xl font-bold mb-4 px-2 text-[#003794] leading-tight md:text-start text-center">
              <span className="text-[#003794]">disability claim</span> today
              with <span className="text-4xl font-extrabold">valr</span>
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-5 md:text-start text-center px-2">
              Tired of delays, paperwork, and confusion? VALR makes filing your
              VA claim fast and stress-free. Our system is built to help you get
              every dollar and benefit you deserve—quickly, clearly, and without
              the usual hassle. No stress. No confusion. Just results.
            </p>
            <div className="text-center bg-[#B31942] text-white py-4 px-6">
              <p className="text-3xl font-bold">Only $195*</p>
              <p className="text-md opacity-90 font-semibold">
                Complete VA Disability Support
              </p>
            </div>
            <p className="text-[#25456F] mt-3 font-extrabold text-lg md:text-xl text-center mb-3">
              no stress. NO CONFUSION. just RESULTS.
            </p>
            <div className="space-y-4 mb-12 space-x-5">
              <a
                href="/#pricing_plan"
                className="inline-block bg-[#003794] text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide shadow-lg"
              >
                GET STARTED
              </a>
              <a
                href="/#contact_us"
                className="inline-block bg-[#B31942] text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wide shadow-lg"
              >
                Contact us
              </a>
            </div>

            <div className="relative z-10 basis-6/12 flex items-center justify-center ">
              <img
                src="https://i.ibb.co/4g0GjgTd/Rectangle-22205.png"
                alt=""
                className="absolute -z-10"
              />
              
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-[450px] max-w-full rounded-[35px]"
              >
                <source src={giff_2} type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>
          </>
        ) : (
          // Mobile view for logged-in user with subscription
          <div className="px-4">
            <h2 className="text-3xl font-bold text-[#003794] uppercase leading-tight md:text-start text-center ">
              Let’s Get Your
              <br />
              <span className="text-[#003794] text-4xl mt-2 inline-block">
                Benefits
              </span>
            </h2>
            <p className="text-gray-700 text-base leading-relaxed my-6 md:text-start text-center">
              Congratulations! Finally, you’re one step closer to receiving the
              benefits you’ve rightfully earned. Get the support you deserve,
              with no more confusion and no more waiting. It’s time to take
              control of your claim with confidence and clarity.
            </p>
            <a
              href="/#features"
              className="bg-[#003794] text-white font-semibold text-lg px-6 py-4 rounded-md uppercase tracking-wide inline-block"
            >
              Start Your Claim Now!
            </a>
            <div className="relative flex justify-center mt-8">
              <img
                src="https://i.ibb.co/23fFSDqr/Group-2147226361.png"
                className="object-cover rounded-2xl px-5"
                alt="VA Disability Expert"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;



