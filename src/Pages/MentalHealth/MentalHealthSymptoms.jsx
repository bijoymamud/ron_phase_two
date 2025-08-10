
import React, { useState } from 'react';
import mentalLogo from "../../assets/mental_health_logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const MentalHealthSymptoms = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      symptoms: {} // Object to store responses for each question
    }
  });
  
  const [submittedData, setSubmittedData] = useState(null); 
  const navigate = useNavigate(); 

  const symptomQuestions = [
    "Do You Have A Hard Time Motivating Yourself?",
    "Do Daily Tasks Feel Like Chores To You?",
    "Do You Have A Hard Time Getting Out Of Bed In The Morning?",
    "Do You Tend To Procrastinate?",
    "Do You Isolate Yourself And Prefer To Be Alone?",
    "Do You Feel Like Going Out In Public?",
    "Do You Look For Exits And Entrances When Out In Public?",
    "Do You Feel Like You Are Always On Guard And Wary Of Other People?",
    "Do You Have A Hard Time Sleeping / Feeling Like Your Brain Is Always Racing, Never Relaxed?",
    "Do You Have Nightmares?",
    "Do You Feel Like You Are Always Exhausted And In A Foggy State Due To That?",
    "Do You Get Irritable Due To This?",
    "Do You Tend To Snap Easily?",
    "Do You Have Little To No Patience?",
    "Do You Avoid People Due To This?",
    "Do You Ever Use Substances To Cope With Your Mental Health? (Alcohol, Drugs, Smoking)",
    "Do You Ever Feel Like A Burden To Your Family?",
    "Do You Ever Wonder Why You Are Still Here Or Question Your Purpose?",
    "Do You Feel Like You Deal With That You Want To Add?"
  ];

  const onSubmit = (data) => {
    const responses = symptomQuestions.reduce((acc, question, index) => {
      const answer = data.symptoms[`question${index}`] || 'Not answered';
      const key = question.replace(/\W/g, '_').toLowerCase().slice(0, 20); 
      acc[key] = answer;
      return acc;
    }, {});
    
    console.log("Mental Health Symptoms Responses:", responses);
    localStorage.setItem('mental_health_symptoms', JSON.stringify(responses));
    
    setSubmittedData(data.symptoms); 
    navigate('/mental_health_indicators');
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]  md:min-h-screen bg-gray-100 pt-14 pb-10">
      <div className="md:p-6 p-2 rounded-lg w-full max-w-4xl flex flex-col justify-between">

        <div className="bg-[#002B5C] w-full rounded-lg p-6 mb-6 flex flex-col items-center">
          <div className="w-52 h-52 bg-purple-600 rounded-full flex items-center justify-center mb-3">
            <img src={mentalLogo} alt="Mental Health Logo" className="w-32 h-32 object-cover" />
          </div>
          <h1 className="text-white text-2xl font-medium mt-2">Mental Health</h1>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow mt-5 px-1  md:px-0">
          {symptomQuestions.map((question, index) => (
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
                      {...register(`symptoms.question${index}`, 
                     
                      )}
                      value="yes"
                      className={`w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${errors.symptoms?.[`question${index}`] ? 'border-red-500' : ''}`}
                    />
                    <span className="ml-2">Yes</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register(`symptoms.question${index}`, 
          
                      )
                      }
                      value="no"
                      className={`w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${errors.symptoms?.[`question${index}`] ? 'border-red-500' : ''}`}
                    />
                    <span className="ml-2">No</span>
                  </div>
                </div>
                {errors.symptoms?.[`question${index}`] && (
                  <span className="text-red-500 text-sm">{errors.symptoms[`question${index}`].message}</span>
                )}
              </label>
            </div>
          ))}

          {/* Buttons Section */}
             <div className="flex justify-center gap-4 md:mt-20 mt-10 md:pb-0 items-center">
         
                     <div className="w-[165px] md:w-[200px]">
                       <Link
                         to="#"
                         onClick={() => window.history.back()}
                         className="w-full block text-center bg-white text-blue-800 py-2 border border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
                       >
                         Back
                       </Link>
                     </div>
         
                     <div className="w-[150px] md:w-[200px]">
                       <button
                         type="submit"
                          
                         className="w-full bg-[#B31942] text-white uppercase py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold"
                       >
                         Continue
                       </button>
                     </div>
                    
                   </div>
        </form>

     
      </div>
    </div>
  );
};

export default MentalHealthSymptoms;