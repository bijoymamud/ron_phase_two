export default function Step5Address({ register, errors }) {
  return (
    <div className="space-y-4">
      {/* Street Address */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
            Street Address
          </span>
        </label>
        <input
          type="text"
          {...register("MailingAddress_NumberAndStreet[0]", {
            required: "Street Address is required",
          })}
          className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
          placeholder="No. & Street"
        />
        {errors.MailingAddress_NumberAndStreet?.[0] && (
          <label className="label">
            <span className="label-text-alt text-error text-sm md:text-base pt-1">
              {errors.MailingAddress_NumberAndStreet[0].message}
            </span>
          </label>
        )}
      </div>

      {/* City */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
            City
          </span>
        </label>
        <input
          type="text"
          {...register("MailingAddress_City[0]", {
            required: "City is required",
          })}
          className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
          placeholder="City"
        />
        {errors.MailingAddress_City?.[0] && (
          <label className="label">
            <span className="label-text-alt text-error text-sm md:text-base pt-1">
              {errors.MailingAddress_City[0].message}
            </span>
          </label>
        )}
      </div>

      {/* State and Country in one row on md+, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* State */}
        <div className="form-control w-full md:w-1/2">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
              State
            </span>
          </label>
          <input
            type="text"
            maxLength="2"
            {...register("MailingAddress_StateOrProvince[0]", {
              required: "State is required",
            })}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
            placeholder="State"
          />
          {errors.MailingAddress_StateOrProvince?.[0] && (
            <label className="label">
              <span className="label-text-alt text-error text-sm md:text-base pt-1">
                {errors.MailingAddress_StateOrProvince[0].message}
              </span>
            </label>
          )}
        </div>

        {/* Country */}
        <div className="form-control w-full md:w-1/2">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
              Country
            </span>
          </label>
          <input
            type="text"
            maxLength="2"
            {...register("MailingAddress_Country[0]", {
              required: "Country is required",
            })}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
            placeholder="Country"
          />
          {errors.MailingAddress_Country?.[0] && (
            <label className="label">
              <span className="label-text-alt text-error text-sm md:text-base pt-1">
                {errors.MailingAddress_Country[0].message}
              </span>
            </label>
          )}
        </div>
      </div>

      {/* ZIP Code */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
            ZIP Code (First 5 digits)
          </span>
        </label>
        <input
          type="number"
          inputMode="numeric"
          pattern="\d*"
          maxLength={5}
          {...register("MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0]", {
            required: "ZIP Code is required",
            pattern: {
              value: /^\d{5}$/,
              message: "Must be 5 digits",
            },
          })}
          className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
          placeholder="12345"
        />
        {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers?.[0] && (
          <label className="label">
            <span className="label-text-alt text-error text-sm md:text-base pt-1">
              {errors.MailingAddress_ZIPOrPostalCode_FirstFiveNumbers[0].message}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
