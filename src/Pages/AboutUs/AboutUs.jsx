import FAQ from "../Home/Faq";

const AboutUs = () => {
  return (
    <section className="relative">
      {/* Hero Section */}
      <div
        className="hidden md:flex bg-cover bg-center bg-no-repeat min-h-screen items-center justify-between"
        style={{
          backgroundImage: "url('https://i.ibb.co/J4JZy4Y/Desktop-9.jpg')",
        }}
      >
        <div className="relative md:flex items-center justify-between mx-auto w-full py-24 pt-44">
          <div className="relative z-10 w-auto max-w-[900px]">
            <div>
              <div className="bg-white rounded-r-[30px] shadow-lg border border-gray-200 py-12 mt-10">
                <div className="ms-0 py-10 px-4 md:px-0">
                  <h2 className="text-3xl md:ps-20 md:text-5xl font-bold text-[#003794] uppercase leading-tight">
                    Driving Quality Support,
                    <br />
                    <span className="text-[#003794] mt-4 inline-block md:text-5xl">
                      and Veteran Satisfaction
                    </span>
                  </h2>
                </div>
              </div>
              <div className="ms-0 py-10 px-4 md:px-20">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                  We're committed to serving those who served our nation,
                  providing resources and support that honor their sacrifice.
                  Learn how our dedicated team is making a difference in
                  veterans' lives every day.
                </p>
              </div>
            </div>
          </div>
          <div className="relative z-10 basis-6/12 flex items-center justify-center">
            <img
              src="https://i.ibb.co/ksPrFSQB/about-us.png"
              className=""
              alt="Banner Graphic"
            />
          </div>
        </div>
      </div>

      {/* Mobile Hero Section */}
      <div className="md:hidden bg-[#E2F5FC] pt-32">
        <div className="text-center pb-10 ">
          <h2 className="text-2xl font-bold text-[#003794] uppercase leading-tight px-3">
            Driving Quality Support,
            <br />
            <span className="text-[#003794] mt-2 inline-block">
              and Veteran Satisfaction
            </span>
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-6 px-1">
            We're committed to serving those who served our nation, providing
            resources and support that honor their sacrifice. Learn how our
            dedicated team is making a difference in veterans' lives every day.
          </p>
          <img
            src="https://i.ibb.co/ksPrFSQB/about-us.png"
            className="px-5"
            alt="Banner Graphic"
          />
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[#E2F5FC]">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="p-4 md:p-16 md:px-20 md:basis-7/12">
            <h1 className="text-3xl md:text-5xl font-bold text-[#003794] pb-6 md:pb-10 text-center md:text-start">
              We are committed
            </h1>
            <div className="mb-6 md:mb-10">
              <p className="text-[#25456F] text-sm md:text-base font-normal text-center md:text-start">
                Our mission is to uphold the honor and dignity of those who have
                sacrificed for our nation by providing services that foster
                personal development, career advancement, and community
                integration. We are committed to creating a welcoming
                environment where veterans feel understood, valued, and
                empowered to achieve their full potential.
              </p>
            </div>
            <div className="space-y-3 text-[#25456F] text-sm md:text-base text-center md:text-start">
              <p>
                Our team is comprised of dedicated professionals who believe in
                the power of community and service. We strive to build strong
                relationships with veterans, their families, and partner
                organizations to create a network of support that extends far
                beyond our doors.
              </p>
              <p>
                Through advocacy, education, and personalized assistance, we
                work tirelessly to ensure that every veteran has access to the
                resources and opportunities they deserve.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center mx-auto py-8 md:py-16">
            <img
              src="https://i.ibb.co/0pQswDVf/about-us-info.png"
              className="w-full max-w-[300px] md:max-w-[500px]"
              alt="About Us Info"
            />
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-20 py-10 px-4 md:px-20  pb-14">
          <div className="bg-[#D7EEFE] p-5 rounded-[20px] shadow-md w-full md:w-auto text-center md:text-start">
            <h1 className="text-[#0070C0] text-3xl md:text-5xl font-bold pb-5 ">
              Our Mission
            </h1>
            <p className="text-[#25456F] text-sm md:text-base">
              To honor veterans' service by providing comprehensive support that
              enhances their quality of life and eases their transition to
              civilian life.
            </p>
          </div>
          <div className="bg-[#C9EFF9] p-5 rounded-[20px] shadow-md w-full md:w-auto text-center md:text-start">
            <h1 className="text-[#61CECB] text-3xl md:text-5xl font-bold pb-5">
              Our Vision
            </h1>
            <p className="text-[#25456F] text-sm md:text-base">
              A nation where all veterans thrive with dignity, purpose, and the
              recognition they deserve for their service and sacrifice.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="md:pb-20">
          <FAQ />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
