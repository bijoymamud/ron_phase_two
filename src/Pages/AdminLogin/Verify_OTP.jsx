import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOtpVerificationMutation } from '../../redux/features/baseApi';
import { useNavigate } from 'react-router-dom';

const Verify_OTP = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 
  const [email, setEmail] = useState(''); 
  const inputRefs = useRef([]); 
  const navigate = useNavigate()
  const [otpVerification, {isLoading:isOtpLoading}] = useOtpVerificationMutation()

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.warn('No email found in localStorage');
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    if (!value) return;

    setValue(`otp${index + 1}`, value.slice(-1), { shouldValidate: true });

    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      setValue(`otp${index + 1}`, '', { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    const otp = Object.values(data).join('');
    console.log('OTP Entered:', otp);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

   const email =  localStorage.getItem("email");
   localStorage.setItem("otp", otp);

   try {

    const response = otpVerification({email, otp}).unwrap();
    console.log(response)

    setTimeout(() => navigate("/recovery_password"), 1000);

    
   } catch (error) {
    console.log('error otp ', error)
   }

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('OTP verified successfully!');
    }, 1500);
  };

  const handleResend = () => {
    console.log('Resend Code Triggered');
    setErrorMessage(null);
    setSuccessMessage('Resend code sent!');
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-center">
        <div className="basis-6/12 bg-[#0A3161] h-screen flex flex-col items-center justify-center">
          <img src="https://i.ibb.co.com/RZzJHnG/Group-2147225243.png" alt="logo" />
        </div>

        <div className="basis-8/12 h-screen flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-[#0A3161] md:p-8 rounded-lg w-full md:max-w-lg"
          >
            <h2 className="md:text-4xl text-3xl font-bold mb-2 text-start">Verify OTP</h2>
            <p className="text-sm text-[#0A3161] mb-10 text-start">
              Enter the code sent to{' '}
              <span className="font-semibold">{email || 'user@example.com'}</span>
            </p>

            {/* Success Message */}
            {/* {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )} */}

            {/* Error Message */}
            {/* {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )} */}

            {/* OTP Inputs */}
            <div className="flex md:gap-4 gap-2 justify-between mb-6">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  {...register(`otp${index + 1}`, {
                    required: 'Digit required',
                    pattern: {
                      value: /^[0-9]$/,
                      message: 'Must be a number',
                    },
                  })}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`md:w-14 md:h-14 w-12 h-12 text-2xl text-center bg-white text-black rounded-md border ${
                    errors[`otp${index + 1}`] ? 'border-red-500' : 'border-gray-300'
                  } focus:border-[#B31942] outline-none`}
                />
              ))}
            </div>

            {/* Display errors if any */}
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm mb-4">
                {errors.otp1?.message || 'Please enter a valid 6-digit OTP'}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-[#B31942] text-white rounded-lg font-semibold hover:bg-[#af2a4d] transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
               <span className="loading loading-bars loading-md"></span>

              ) : (
                'Verify'
              )}
            </button>

            {/* Resend Link */}
            <p className="mt-4 text-[#0A3161] text-end">
              Did not receive code?{' '}
              <span onClick={handleResend} className="text-[#B31942] font-semibold cursor-pointer">
                Resend
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify_OTP;