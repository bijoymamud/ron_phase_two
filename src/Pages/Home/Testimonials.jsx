
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.css"
import { useCallback } from "react"
import quote from '../../assets/quote.png'

const testimonials = [
  {
    name: "John Smith",
    role: "CEO, Tech Corp",
    text: "We Take Pride In Fostering A Compassionate And Supportive Environment, And Their Testimonials Reflect The Positive Impact Of Our Services From Personalized Treatments To A Friendly And Professional Team",
    image: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png",
    stars: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Director, Innovation Labs",
    text: "We Take Pride In Fostering A Compassionate And Supportive Environment, And Their Testimonials Reflect The Positive Impact Of Our Services From Personalized Treatments To A Friendly And Professional Team",
    image: "https://cdn-icons-png.freepik.com/512/219/219990.png",
    stars: 5,
  },
  {
    name: "Michael Brown",
    role: "Founder, StartUp Inc",
    text: "We Take Pride In Fostering A Compassionate And Supportive Environment, And Their Testimonials Reflect The Positive Impact Of Our Services From Personalized Treatments To A Friendly And Professional Team",
    image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    stars: 5,
  },
]

export default function TestimonialSlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 }, // Tablet
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 20 }, // Desktop
      },
    },
  })

  const handlePrevious = useCallback(() => {
    instanceRef.current?.prev()
  }, [instanceRef])

  const handleNext = useCallback(() => {
    instanceRef.current?.next()
  }, [instanceRef])

  return (
    <section className="bg-gray-200 py-20 px-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="md:text-4xl text-center text-2xl  font-bold text-gray-800 mb-4 md:px-10">What Veterans & Leaders Say About Us</h1>
      <p className="md:w-5/6 lg:w-3/5 text-center mb-20 font-medium text-gray-600 px-2">Hear from those we've proudly served — from veterans to industry leaders — as they share how our dedication, personalized support, and proven results have made a lasting impact on their journey.
</p>
      </div>
      <div className="relative sm:px-6 lg:px-8 container mx-auto">

        {/* Testimonial Slider */}
        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="keen-slider__slide px-2">
              <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-between shadow-md border">
                {/* Testimonial Text */}
                <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                  {testimonial.text}
                </p>

                {/* Profile Section */}
                <div className="flex items-start justify-between mt-auto pt-4 border-t">
                  <div className="flex flex-col">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mb-2"
                    />
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                  <img src={quote} alt="quote" className="h-10 sm:h-12" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 border border-gray-200 shadow-md bg-white rounded-full p-2 hover:bg-gray-50 transition z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 border border-gray-200 shadow-md bg-white rounded-full p-2 hover:bg-gray-50 transition z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </section>
  )
}
