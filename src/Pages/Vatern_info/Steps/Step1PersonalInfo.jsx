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
            {...register("veteran_service_member_first_fname", {
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

      {/* middle name */}
      <div className="form-control">
        <label htmlFor="firstName" className="label">
          <span className="label-text  font-semibold md:text-base text-[12px] pb-1 dark:text-black">
            Middle Name
          </span>
        </label>
        <div className="relative">
          <input
            id="middleName"
            type="text"
            {...register("veteran_service_member_middle_mname", {
              required: "Middle Name is required",
            })}
            className={`input input-bordered py-5 w-full pl-10 dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-0${
              errors.member_middle_name ? "input-error" : ""
            }`}
            placeholder="Enter your middle name"
            aria-invalid={errors.member_middle_name ? "true" : "false"}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={18} />
          </span>
        </div>
        {errors.member_middle_name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.member_middle_name.message}
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
            {...register("veteran_service_member_last_lname", {
              required: "Last Name is required",
            })}
            className={`input input-bordered py-5 w-full pl-10 dark:bg-white dark:input-bordered dark:border-black dark:text-black ${
              errors.veteran_service_member_last_lname ? "input-error" : ""
            }`}
            placeholder="Enter your last name"
            aria-invalid={
              errors.veteran_service_member_last_lname ? "true" : "false"
            }
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={18} />
          </span>
        </div>
        {errors.veteran_service_member_last_lname && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.veteran_service_member_last_lname.message}
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
            {...register("veterans_email_primary", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: "Invalid email format",
              },
            })}
            className={`input input-bordered py-5 w-full pl-10 dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-0 ${
              errors.veterans_email_primary ? "input-error" : ""
            }`}
            placeholder="Enter your email address"
            aria-invalid={errors.veterans_email_primary ? "true" : "false"}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </span>
        </div>
        {errors.veterans_email_primary && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.veterans_email_primary.message}
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
            {...register("veterans_email_optional", {
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="input input-bordered py-5 w-full pl-10 dark:bg-white dark:input-bordered dark:border-black dark:text-black focus:ring-0"
            placeholder="Enter alternate email (optional)"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </span>
        </div>
        {errors.veterans_email_optional && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.veterans_email_optional.message}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
