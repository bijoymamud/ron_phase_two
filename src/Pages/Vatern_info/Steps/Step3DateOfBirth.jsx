export default function Step3DateOfBirth({ register, errors }) {
  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] dark:text-black pb-1">
            Date of Birth (MM/DD/YYYY)
          </span>
        </label>
        <div className="flex space-x-2">
     
<input
  type="text"
  inputMode="numeric"
  pattern="\d*"
  maxLength={2}
  {...register("DOB_Month[0]", {
    required: "Month is required",
    pattern: {
      value: /^(0[1-9]|1[0-2])$/,
      message: "Invalid month (01-12)",
    },
  })}
  onInput={(e) => {
    if (e.target.value.length === 1 && e.target.value > '1') {
      e.target.value = '0' + e.target.value;
    }
    if (parseInt(e.target.value) > 12) {
      e.target.value = '12';
    }
  }}
  className="input input-bordered dark:bg-white dark:border-black dark:text-black w-1/3 py-5"
  placeholder="MM"
/>


          <input
  type="text"
  inputMode="numeric"
  pattern="\d*"
  maxLength={2}
  {...register("DOB_Day[0]", {
    required: "Day is required",
    pattern: {
      value: /^(0[1-9]|[12][0-9]|3[01])$/,
      message: "Invalid day (01-31)",
    },
  })}
  onInput={(e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length === 1 && parseInt(val) > 3) {
      e.target.value = "0" + val;
    } else if (parseInt(val) > 31) {
      e.target.value = "31";
    }
  }}
  className="input input-bordered dark:bg-white dark:border-black dark:text-black w-1/3 py-5"
  placeholder="DD"
/>

          <input
          type="text"
         inputMode="numeric"
          pattern="\d*"
           maxLength={4}
            {...register("DOB_Year[0]", {
              required: "Year is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Invalid year (e.g., 1990)",
              },
            })}

            className="input input-bordered dark:bg-white dark:border-black dark:text-black w-1/3 py-5"
            placeholder="YYYY"
          />
        </div>
        {(errors.DOB_Month?.[0] ||
          errors.DOB_Day?.[0] ||
          errors.DOB_Year?.[0]) && (
          <label className="label">
            <span className="label-text-alt text-error">
              Please enter a valid date of birth
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
