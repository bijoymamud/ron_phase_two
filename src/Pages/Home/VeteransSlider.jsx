import React from "react";
import reviewOne from "../../assets/review_1.png";
import reviewTwo from "../../assets/review_2.png";
import reviewThree from "../../assets/review_3.png";

const EmpoweringVeterans = () => {
  const cards = [
    {
      title:
        "TIPS FOR SUCCESSFULLY TRANSITIONING FROM MILITARY TO CIVILIAN LIFE",
      description:
        "Transitioning from military to civilian life requires planning, networking, and leveraging available resources to ensure a smooth and successful adjustment.",
      imgSrc: reviewOne,
      alt: "Military to civilian transition",
    },
    {
      title: "HOW TO APPEAL A DENIED CLAIM",
      description:
        "If your claim has been denied, don’t worry—appealing is your right. Start by reviewing the denial letter to understand the reasons, gather any missing documents or evidence.",
      imgSrc: reviewTwo,
      alt: "Appeal denied claim",
    },
    {
      title: "COMMON MISTAKES VETERANS MAKE WHEN APPLYING FOR BENEFITS",
      description:
        "Transitioning from military to civilian life requires planning, networking, and leveraging available resources to ensure a smooth and successful adjustment.",
      imgSrc: reviewThree,
      alt: "Mistakes when applying for benefits",
    },
  ];

  return (
    <section className="bg-[#E0F7FF] dark:bg-[#E0F7FF] px-2 md:px-12 pt-8">
      <div className="md:container mx-auto text-center">
        <h2 className="md:text-4xl text-2xl font-bold text-[#16437E] mb-8">
          EMPOWERING VETERANS
          <br /> THROUGH EDUCATION
        </h2>
        <p className="md:text-lg text-[#4B5563] text-base w-full mb-8 lg:w-[60%] text-center mx-auto">
          Education transforms lives, and we're committed to empowering veterans
          with opportunities to learn, grow, and succeed. From skill-building to
          career advancement, we provide the resources and support needed to
          unlock your potential and shape a brighter future.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4 pb-14 md:pb-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:mb-10"
            >
              <img
                className="w-full h-62 object-cover rounded-none"
                src={card.imgSrc}
                alt={card.alt}
                width={card.width}
                height={card.height}
                loading="lazy" // Lazy-load images below the fold
              />
              <div className="flex-1 md:p-6 p-3">
                <div>
                  <h3 className="text-xl font-semibold text-[#16437E] mb-4 md:text-start text-center">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-[16px] md:text-base md:text-start text-center">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpoweringVeterans;
