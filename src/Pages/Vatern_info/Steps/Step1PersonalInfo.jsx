import { Mail, MailWarning, User } from "lucide-react";

export default function Step1PersonalInfo({ register, errors }) {
  return (
    <div className="space-y-6 md:p-6  bg-base-100 rounded-lg  md:max-w-2xl mx-auto dark:bg-white">
      {/* First Name Field */}
      <div className="form-control">
        <label htmlFor="firstName" className="label">
          <span className="label-text  font-semibold md:text-base text-[12px] pb-1 dark:text-black">
            First Name
          </span>
        </label>
        <div className="relative">
          <input
            id="firstName"
            type="text"
            {...register("Veterans_Beneficiary_First_Name[0]", {
              required: "First Name is required",
            })}
            className={`input input-bordered py-5 w-full pl-10 dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-0${
              errors.Veterans_Beneficiary_First_Name?.[0] ? "input-error" : ""
            }`}
            placeholder="Enter your first name"
            aria-invalid={
              errors.Veterans_Beneficiary_First_Name?.[0] ? "true" : "false"
            }
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={18} />
          </span>
        </div>
        {errors.Veterans_Beneficiary_First_Name?.[0] && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.Veterans_Beneficiary_First_Name[0].message}
            </span>
          </label>
        )}
      </div>

      {/* Last Name Field */}
      <div className="form-control">
        <label htmlFor="lastName" className="label">
          <span className="label-text font-semibold md:text-base text-[12px] pb-1 dark:text-black">
            Last Name
          </span>
        </label>
        <div className="relative">
          <input
            id="lastName"
            type="text"
            {...register("Last_Name[0]", {
              required: "Last Name is required",
            })}
            className={`input input-bordered py-5 w-full pl-10 dark:bg-white dark:input-bordered dark:border-black dark:text-black ${
              errors.Last_Name?.[0] ? "input-error" : ""
            }`}
            placeholder="Enter your last name"
            aria-invalid={errors.Last_Name?.[0] ? "true" : "false"}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={18} />
          </span>
        </div>
        {errors.Last_Name?.[0] && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.Last_Name[0].message}
            </span>
          </label>
        )}
      </div>

      {/* Email Address Field */}
      <div className="form-control dark:bg-white">
        <label htmlFor="email" className="label">
          <span className="label-text font-semibold md:text-base text-[12px] pb-1 dark:text-black">
            Email Address
          </span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register("EMAIL_ADDRESS[0]", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: "Invalid email format",
              },
            })}
            className={`input input-bordered py-5 w-full pl-10 focus:ring-2 dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-primary focus:border-primary ${
              errors.EMAIL_ADDRESS?.[0] ? "input-error" : ""
            }`}
            placeholder="Enter your email address"
            aria-invalid={errors.EMAIL_ADDRESS?.[0] ? "true" : "false"}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </span>
        </div>
        {errors.EMAIL_ADDRESS?.[0] && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.EMAIL_ADDRESS[0].message}
            </span>
          </label>
        )}
      </div>

      {/* Alternate Email Address Field */}
      <div className="form-control">
        <label htmlFor="altEmail" className="label">
          <span className="label-text font-semibold md:text-base text-[12px] pb-1 dark:text-black">
            Alternate Email Address{" "}
            <span className="text-gray-500">(Optional)</span>
          </span>
        </label>
        <div className="relative">
          <input
            id="altEmail"
            type="email"
            {...register("EMAIL_ADDRESS[1]", {
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="input input-bordered py-5 w-full pl-10 border-gray-400 dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter alternate email (optional)"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </span>
        </div>
        {errors.EMAIL_ADDRESS?.[1] && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.EMAIL_ADDRESS[1].message}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
