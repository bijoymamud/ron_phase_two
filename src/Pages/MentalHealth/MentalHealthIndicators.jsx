import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mentalLogo from "../../assets/mental_health_logo.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useCategoryNavigation from "../../hooks/useCategoryNavigation";
import { removeCategoryByName } from "../../redux/slice/issueSlice";

const MentalHealthIndicators = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			indicators: {},
		},
	});

	const { navigateToNextCategory } = useCategoryNavigation();
	const selectedCategories = useSelector(
		(state) => state.issueSlice.selectedCategories
	);
	const navigate = useNavigate();

	const indicatorQuestions = [
		"Did You Have Any Increased Visits To A Medical Professional? Any Counseling Or Mental Health Services?",
		"Did You Request For A Change In Occupational Series Or Duty Assignment?",
		"Did You Ever Have Increased Or Decreased Use Of Leave?",
		"Any Changes In Your Performance Or Performance Evaluations?",
		"Did You Have Episodes Of Depression, Panic Attacks, Or Anxiety?",
		"Any Increased Use Of Prescription Medications, Over-The-Counter Medications, Drugs, Or Alcohol?",
		"Any Disciplinary Or Legal Difficulties?",
		"Any Pregnancy Tests Or Tests For STDs/STIs?",
		"Any Economic Or Social Behavior Changes? Isolating Yourself Or Withdrawing From Others?",
		"Any Changes Or Breakups Of A Significant Relationship?",
	];

	const onSubmit = (data) => {
		// Create an object mapping questions to answers
		const responses = indicatorQuestions.reduce((acc, question, index) => {
			const answer =
				data.indicators[`question${index}`] || "Not answered";

			const key = question.replace(/\W/g, "_").toLowerCase().slice(0, 20);
			acc[key] = answer;
			return acc;
		}, {});

		console.log("Mental Health Indicators Responses:", responses);
		localStorage.setItem(
			"mental_health_indicators",
			JSON.stringify(responses)
		);

		const currentCategoryIndex =
			selectedCategories.indexOf("Mental Health");

		if (currentCategoryIndex !== -1) {
			if (selectedCategories[currentCategoryIndex + 1]) {
				const nextCategory =
					selectedCategories[currentCategoryIndex + 1];
				navigateToNextCategory(nextCategory);
			} else {
				navigateToNextCategory("");
			}
		}
	};

	useEffect(() => {
		console.log("Selected Categories:", selectedCategories);
	}, [selectedCategories]);

	return (
		<div className="flex justify-center items-center min-h-[85vh]  md:min-h-screen bg-gray-100 pt-14 pb-10">
			<div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">
				<div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center">
					<div className="w-52 h-52 bg-purple-600 rounded-full flex items-center justify-center mb-3">
						<img
							src={mentalLogo}
							alt="Mental Health Logo"
							className="w-32 h-32 object-cover"
						/>
					</div>
					<h1 className="text-white text-2xl font-medium mt-2">
						Mental Health
					</h1>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 flex-grow px-1 md:px-0"
				>
					{indicatorQuestions.map((question, index) => (
						<div
							key={index}
							className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
						>
							<label className="block text-sm font-medium text-gray-700">
								{question}
								<div className="mt-1 flex items-center space-x-4">
									<div className="flex items-center">
										<input
											type="radio"
											{...register(
												`indicators.question${index}`
											)}
											value="yes"
											className={`w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${errors.indicators?.[`question${index}`] ? "border-red-500" : ""}`}
										/>
										<span className="ml-2">Yes</span>
									</div>
									<div className="flex items-center">
										<input
											type="radio"
											{...register(
												`indicators.question${index}`
											)}
											value="no"
											className={`w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${errors.indicators?.[`question${index}`] ? "border-red-500" : ""}`}
										/>
										<span className="ml-2">No</span>
									</div>
								</div>
								{errors.indicators?.[`question${index}`] && (
									<span className="text-red-500 text-sm">
										{
											errors.indicators[
												`question${index}`
											].message
										}
									</span>
								)}
							</label>
						</div>
					))}
					<div className="flex justify-center gap-4 mt-6">
						<Link
							to="#"
							className="bg-white text-blue-800 px-6 py-2 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] md:w-[200px] text-center font-semibold"
							onClick={() => window.history.back()}
						>
							Back
						</Link>

						<button
							type="submit"
							className="bg-[#B31942] text-white px-6 py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-red-500 w-[150px] md:w-[200px] font-semibold"
						>
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MentalHealthIndicators;
