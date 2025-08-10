import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
	{
		title: "Fast and Easy",
		problem:
			"Veterans often face long, confusing, outdated processes when applying for benefits, sometimes giving up halfway.",
		solution:
			"VALR walks you through each step with simple instructions and smart forms. You don't need to be tech-savvy or know VA jargon. It's like having a personal guide right in your pocket.",
		image: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1749636080/Image_2_xc75ty.jpg",
	},
	{
		title: "All-In-One",
		problem:
			"Veterans often don't know who to talk to, where their paperwork went, or what the next step is.",
		solution:
			"Everything is in one place. You can track your progress, see what's coming next, and get real-time help when you need it.",
		image: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1749636147/Image_3_jhhvx0.jpg",
	},
	{
		title: "Less Stress",
		problem:
			"Paperwork piles up. Many vets feel anxious or frustrated when figuring out what forms to fill, what evidence to submit, and how to word things.",
		solution:
			"VALR breaks the process down into smaller steps, eliminating guesswork. You get reminders, encouragement, and support all along the way, reducing anxiety and overwhelm.",
		image: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750421893/Image_13_pry9co.jpg",
	},
	{
		title: "Veteran-Focused",
		problem:
			"General benefit tools are not designed with veterans in mind. They don't understand your military history or the unique challenges vets face.",
		solution:
			"VALR is built for veterans, by people who support veterans. It understands VA language, discharge codes, and service-connected issues, and gives guidance that's relevant to your experience.",
		image: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1749636156/Image_4_jzmp6h.jpg",
	},
	{
		title: "Success Rate",
		problem:
			"Many vets get denied because of incomplete or incorrect applications. Some never reapply because they feel defeated.",
		solution:
			"VALR improves your chances by making sure you provide complete, accurate, and compelling claims the first time. It helps you avoid the common mistakes that lead to denials.",
		image: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750423964/Image_15_aceerv.jpg",
	},
	{
		title: "Stay Updated",
		problem:
			"The VA process can be slow, and veterans are often left in the dark.",
		solution:
			"VALR keeps you updated with alerts and reminders. You'll always know where your claim stands, and what action (if any) is needed from you.",
		image: "https://img.freepik.com/free-photo/happy-male-entrepreneur-working-computer-office_637285-6738.jpg?semt=ais_hybrid&w=740",
	},
	{
		title: "Safe and Secure",
		problem:
			"Veterans are understandably protective of their personal and service information.",
		solution:
			"VALR uses encrypted technology and secure systems to ensure your data is always protected. Your trust is our top priority.",
		image: "https://www.eventmarketer.com/wp-content/uploads/2018/01/event-safety_data_digital_stock-1280x879.jpg",
	},
];

const quotes = [
	{
		author: "CHRIS FRENCH",
		role: "Founder VALR",
		bio: "US Navy Veteran and VA Benefits Expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750419703/Image_8_z0ma2d.jpg",
		quote: "Real talk, veterans — filing for your benefits doesn't have to be a battle. Valr simplifies the process, cuts the stress, and increases your chances of success. Get what you've earned, without the headache.",
	},
	{
		author: "ROBERT BAILEY",
		role: "founder VALR",
		bio: "US ARMY Veteran and VA Benefits Expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750420023/Image_12_cweddt.jpg",
		quote: "One of the biggest frustrations veterans face is being left in the dark during the VA claims process. With VALR, we put an end to that. Veterans deserve clarity, not confusion—so we built a system that keeps you updated every step of the way, with real-time alerts, reminders, and guidance on what to do next.",
	},
	{
		author: "Wayne Schomburg",
		bio: "USaf 25 year Veteran and VA Benefits Expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750419999/Image_11_m5oz4g.jpg",
		quote: "The VA filing process can be very intimidating once a vet has been denied. Let the experts at VALR educate and guide you to a successful disability claim. We know how to navigate the claim process.",
	},
	{
		author: "Major Murray Kim",
		role: "US ARMY VETERAN 32 YEARS SERVED",
		bio: "VA Benefits Expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750419736/Image_7_toa5qv.jpg",
		quote: "I sleep better now knowing that my Father and six Uncles who all served over two decades each in the Army and Marine Corps are now receiving 100% VA disability benefits. Filing a disability claim is not a selfish act, but a necessary duty you owe to yourself. You did your part, now let us do ours",
	},
	{
		author: "BRYAN BLAIN",
		bio: "US MARINE Veteran and VA Benefits Expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750419754/Image_9_kyztfd.jpg",
		quote: "VALR is doing everything right to make sure veterans like you get the rating and recognition you truly deserve. We understand the struggles, the long waits, the frustration. That's why we built VALR — to fight for you, to simplify the process, and to deliver real results.",
	},
	{
		author: "Stacey Michelon",
		role: "Founder VALR",
		bio: "HOST of YOU SERVE YOU DESERVE veterans benefits expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750426685/Image_10_ycehfv.jpg",
		quote: "VALRapp: Your all-in-one tool to stay updated, stay connected, and stay in control—because veterans deserve answers without the red tape.",
	},
	{
		author: "CHRIS FRENCH",
		role: "Founder VALR",
		bio: "US Navy Veteran and VA Benefits Expert",
		avatar: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1750419703/Image_8_z0ma2d.jpg",
		quote: "At VALR, your trust is our mission. That's why we use encrypted technology and secure systems to protect what matters most—your service and your story.",
	},
];

export default function SliderWithQuotes() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [quoteIndex, setQuoteIndex] = useState(0);
	const [isSlidesPaused, setIsSlidesPaused] = useState(false);

	useEffect(() => {
		if (isSlidesPaused) return;
		const slideInterval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % slides.length);
		}, 4000);
		return () => clearInterval(slideInterval);
	}, [isSlidesPaused]);

	useEffect(() => {
		const quoteInterval = setInterval(() => {
			setQuoteIndex((prev) => (prev + 1) % quotes.length);
		}, 4000);
		return () => clearInterval(quoteInterval);
	}, []);

	const nextSlide = () =>
		setCurrentIndex((prev) => (prev + 1) % slides.length);
	const prevSlide = () =>
		setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
	const goToSlide = (index) => setCurrentIndex(index);

	const currentSlide = slides[currentIndex];
	const currentQuote = quotes[quoteIndex];

	return (
		<div className="bg-gray-200 dark:bg-gray-200 md:pb-10">
			<div className="container mx-auto md:pt-20 md:px-4 px-2  dark:bg-gray-200">
				<div
					className="relative bg-white rounded-xl md:shadow-md overflow-hidden min-h-[500px] md:h-[500px]"
					onMouseEnter={() => setIsSlidesPaused(true)}
					onMouseLeave={() => setIsSlidesPaused(false)}
				>
					<div className="flex flex-col md:flex-row h-full">
						<div
							className="w-full md:w-1/2 p-2 md:p-8 relative flex flex-col justify-center bg-center bg-no-repeat bg-cover min-h-[500px] md:h-full"
							style={{
								backgroundImage:
									"url('https://res.cloudinary.com/dpi0t9wfn/image/upload/v1749639487/Dark_Modern_Elegant_Singer_New_Song_YouTube_Thumbnail_skmw5p.png')",
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div className="absolute inset-0 w-full bg-white bg-opacity-10 backdrop-blur-[1px] z-0" />
							<div className="relative z-10 h-full flex flex-col justify-center">
								<h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-4">
									{currentSlide.title}
								</h2>
								<div className="space-y-4">
									<div>
										<p className="font-semibold text-gray-800 mb-2">
											The Problem:
										</p>
										<p className="text-gray-600 text-sm md:text-base leading-relaxed">
											{currentSlide.problem}
										</p>
									</div>
									<div>
										<p className="font-semibold text-gray-800 mb-2">
											VALR Solution:
										</p>
										<p className="text-gray-600 text-sm md:text-base leading-relaxed">
											{currentSlide.solution}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full md:w-1/2 h-[250px] md:h-full relative">
							<div className="w-full h-full clip-diagonal md:clip-auto overflow-hidden">
								<img
									src={
										currentSlide.image || "/placeholder.svg"
									}
									alt={`${currentSlide.title} illustration`}
									className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
								/>
							</div>
						</div>
					</div>
					<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<button
								onClick={prevSlide}
								className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md hover:scale-110 transition-transform"
							>
								<ChevronLeft className="w-4 h-4 text-blue-900" />
							</button>
							<button
								onClick={nextSlide}
								className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md hover:scale-110 transition-transform"
							>
								<ChevronRight className="w-4 h-4 text-blue-900" />
							</button>
						</div>
						<div className="flex space-x-2">
							{slides.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-blue-900 scale-110" : "bg-white/60 hover:bg-white/80"}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="py-16 container mx-auto md:px-4 px-2 dark:bg-gray-200">
				<div className="relative bg-gradient-to-r from-[#000000]/95 to-[#3533cd] rounded-2xl overflow-hidden shadow-2xl min-h-[400px] border border-gray-200">
					<div className="relative flex flex-col lg:flex-row h-full md:min-h-[400px]">
						<div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-center  text-white">
							<div className="mb-4">
								<h3 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-start">
									{currentQuote.author}
								</h3>
								{currentQuote.role && (
									<p className="text-white text-sm text-center md:text-start">
										{currentQuote.role}
									</p>
								)}
								<p className="text-white text-sm mt-2 text-center md:text-start">
									{currentQuote.bio}
								</p>
							</div>
						</div>

						<div className="w-full lg:w-1/4 flex items-center justify-center p-4">
							<img
								src={currentQuote.avatar || "/placeholder.svg"}
								alt={`${currentQuote.author} portrait`}
								className="h-48 w-48 md:h-56 md:w-56 object-cover border-4 border-blue-300/50 rounded-full  shadow-lg"
							/>
						</div>

						<div className="w-full lg:w-2/4 p-6 md:p-8 flex flex-col justify-center mb-5">
							<div className="relative">
								<span className="md:text-6xl text-3xl text-[#ffffff] opacity-90 absolute -top-8 -left-4"></span>
								<p className="text-white text-lg md:text-xl italic relative z-10">
									“{currentQuote.quote}”
								</p>
								<span className="md:text-6xl text-3xl text-[#ffffff] opacity-90 absolute -bottom-8 -right-4"></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
        .clip-diagonal {
          clip-path: polygon(15% 0, 100% 0%, 100% 100%, 0% 100%);
        }
        @media (max-width: 767px) {
          .clip-diagonal {
            clip-path: none;
          }
        }
      `}</style>
		</div>
	);
}
