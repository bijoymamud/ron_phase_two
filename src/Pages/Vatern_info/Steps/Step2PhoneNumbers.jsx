import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Step2PhoneNumbers({ register, errors, setValue, watch, trigger }) {
  const internationalPhoneNumber = watch("International_Phone_Number[0]");

  useEffect(() => {
    if (internationalPhoneNumber) {
      setValue("International_Phone_Number[0]", internationalPhoneNumber, {
        shouldValidate: true,
      });
    }
  }, [internationalPhoneNumber, setValue]);

  return (
    <div className="space-y-6">

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base dark:text-black text-[12px] pb-1">
            International Phone Number
          </span>
        </label>


<PhoneInput
  country={"us"}
  value={internationalPhoneNumber}
  onChange={(phone) => {
    const cleanedPhone = phone.replace(/\s+/g, ""); 
    setValue("International_Phone_Number[0]", cleanedPhone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    trigger("International_Phone_Number[0]");
  }}
  inputProps={{
    name: "International_Phone_Number[0]",
    required: true,
    className:
      "input input-bordered w-full dark:bg-white dark:border-black dark:text-black py-5 pl-12",
  }}
  containerClass="w-full"
  specialLabel={false}
/>
        <input
          type="hidden"
          {...register("International_Phone_Number[0]", {
            required: "Input valid number",
          })}
        />

        {errors["International_Phone_Number[0]"] && (
          <label className="label">
            <span className="label-text-alt text-error text-sm pt-1">
              {errors["International_Phone_Number[0]"].message}
            </span>
          </label>
        )}
      </div>

   
    </div>
  );
}
