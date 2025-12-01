import { useEffect } from "react";

export default function Step5Address({ register, errors, watch, setValue }) {
  const permanent = watch("adress_changes_PERMANENT");
  const temporary = watch("adress_changes_TEMPORARY");

  useEffect(() => {
    setValue("adress_changes_PERMANENT", false);
    setValue("adress_changes_TEMPORARY", false);
  }, [setValue]);

  const handleChange = (type) => {
    if (type === "permanent") {
      setValue("adress_changes_PERMANENT", true);
      setValue("adress_changes_TEMPORARY", false);
    } else if (type === "temporary") {
      setValue("adress_changes_TEMPORARY", true);
      setValue("adress_changes_PERMANENT", false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label-text font-medium md:text-base text-[12px] pb-2 dark:text-black block">
          Type of address change (complete if applicable)
        </label>

        <div className="flex items-center gap-12 mt-3">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={permanent === true}
              onChange={() => handleChange("permanent")}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm dark:text-black font-medium">
              Permanent
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={temporary === true}
              onChange={() => handleChange("temporary")}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm dark:text-black font-medium">
              Temporary
            </span>
          </label>
        </div>
      </div>

      <div className="form-control md:flex items-center gap-6">
        <div className="basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              Street Address
            </span>
          </label>
          <input
            type="text"
            {...register("veterans_mailing_address", {
              required: "Street Address is required",
            })}
            className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
            placeholder="No. & Street"
          />
          {errors.MailingAddress_NumberAndStreet?.[0] && (
            <p className="text-error text-sm mt-1">
              {errors.veterans_mailing_address.message}
            </p>
          )}
        </div>

        <div className="basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              APT./UNIT NUMBER
            </span>
          </label>
          <input
            type="text"
            {...register("veterans_apt_unit")}
            className="input input-bordered w-full py-5 dark:bg-white uppercase dark:border-black dark:text-black"
            placeholder="Apt./Unit number"
          />
        </div>
      </div>

      {/* City */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
            City
          </span>
        </label>
        <input
          type="text"
          {...register("veterans_city", {
            required: "City is required",
          })}
          className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
          placeholder="City"
        />
        {errors.MailingAddress_City?.[0] && (
          <p className="text-error text-sm mt-1">
            {errors.veterans_city.message}
          </p>
        )}
      </div>

      {/* State & Country */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              State
            </span>
          </label>
          <input
            type="text"
            maxLength={2}
            {...register("veterans_state", {
              required: "State is required",
            })}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
            placeholder="State"
          />
          {errors.MailingAddress_StateOrProvince?.[0] && (
            <p className="text-error text-sm mt-1">
              {errors.veterans_state.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              Country
            </span>
          </label>
          <input
            type="text"
            defaultValue="US"
            {...register("veterans_country")}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black uppercase"
            placeholder="Country"
          />
        </div>
      </div>

      {/* ZIP Code */}
      <div className="md:flex items-center gap-5">
        <div className="form-control basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              ZIP Code (First 5 digits)
            </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="12345"
            {...register("veterans_zip_code", {
              required: "ZIP Code is required",
              pattern: { value: /^\d{5}$/, message: "Must be 5 digits" },
            })}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
            }}
          />
          {errors.veterans_zip_code?.[0] && (
            <p className="text-error text-sm mt-1">
              {errors.veterans_zip_code.message}
            </p>
          )}
        </div>

        <div className="form-control basis-6/12">
          <label className="label">
            <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:text-black">
              Postal Code
            </span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="1234"
            {...register("veterans_postal_code", {
              required: "Postal Code is required",
              pattern: { value: /^\d{5}$/, message: "Must be 4 digits" },
            })}
            className="input input-bordered w-full py-5 dark:bg-white dark:border-black dark:text-black"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 5);
            }}
          />
          {errors.veterans_postal_code && (
            <p className="text-error text-sm mt-1">
              {errors.veterans_postal_code.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
