export default function Step4ServiceDates({ register, errors }) {
  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
            Service Entry Date (MM/DD/YYYY)
          </span>
        </label>
        <div className="flex space-x-2">
          {/* <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={2}
            {...register("Beginning_Date_Month[0]", {
              required: "Month is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])$/,
                message: "Invalid month (01-12)",
              },
            })}
            onInput={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length === 1 && parseInt(val) > 1) {
                e.target.value = "0" + val;
              } else if (parseInt(val) > 12) {
                e.target.value = "12";
              }
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="MM"
          /> */}

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={2}
            {...register("Beginning_Date_Month[0]", {
              required: "Month is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])$/,
                message: "Invalid month (01-12)",
              },
            })}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length === 1 && parseInt(val) > 1) {
                e.target.value = "0" + val;
              } else if (parseInt(val) > 12) {
                e.target.value = "12";
              }
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="MM"
          />

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={2}
            {...register("Beginning_Date_Day[0]", {
              required: "Day is required",
              pattern: {
                value: /^(0[1-9]|[12][0-9]|3[01])$/,
                message: "Invalid day (01-31)",
              },
            })}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault(); // Block anything that's not a digit
              }
            }}
            onInput={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length === 1 && parseInt(val) > 3) {
                e.target.value = "0" + val;
              } else if (parseInt(val) > 31) {
                e.target.value = "31";
              }
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="DD"
          />

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            {...register("Beginning_Date_Year[0]", {
              required: "Year is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Invalid year (e.g., 1990)",
              },
            })}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault(); // Block any non-digit input
              }
            }}
            onInput={(e) => {
              // Strip non-numeric in case of paste
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="YYYY"
          />
        </div>
        {(errors.Beginning_Date_Month?.[0] ||
          errors.Beginning_Date_Day?.[0] ||
          errors.Beginning_Date_Year?.[0]) && (
          <label className="label">
            <span className="label-text-alt text-error">
              Please enter a valid service entry date
            </span>
          </label>
        )}
      </div>

      {/* Service Exit Date */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium md:text-base text-[12px] pb-1 dark:bg-white dark:border-black dark:text-black">
            Service Exit Date (MM/DD/YYYY)
          </span>
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={2}
            {...register("Ending_Date_Month[0]", {
              required: "Month is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])$/,
                message: "Invalid month (01-12)",
              },
            })}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault(); // Block any non-digit before typing
              }
            }}
            onInput={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length === 1 && parseInt(val) > 1) {
                e.target.value = "0" + val;
              } else if (parseInt(val) > 12) {
                e.target.value = "12";
              }
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="MM"
          />

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={2}
            {...register("Ending_Date_Day[0]", {
              required: "Day is required",
              pattern: {
                value: /^(0[1-9]|[12][0-9]|3[01])$/,
                message: "Invalid day (01-31)",
              },
            })}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault(); // block letters, symbols, spaces
              }
            }}
            onInput={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (val.length === 1 && parseInt(val) > 3) {
                e.target.value = "0" + val;
              } else if (parseInt(val) > 31) {
                e.target.value = "31";
              }
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="DD"
          />

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            {...register("Ending_Date_Year[0]", {
              required: "Year is required",
              pattern: {
                value: /^\d{4}$/,
                message: "Invalid year (e.g., 1990)",
              },
            })}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data)) {
                e.preventDefault(); // block non-digit before typing
              }
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, ""); // strip non-digits on paste
            }}
            className="input input-bordered w-1/3 py-5 dark:bg-white dark:border-black dark:text-black"
            placeholder="YYYY"
          />
        </div>
        {(errors.Ending_Date_Month?.[0] ||
          errors.Ending_Date_Day?.[0] ||
          errors.Ending_Date_Year?.[0]) && (
          <label className="label">
            <span className="label-text-alt text-error">
              Please enter a valid service exit date
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
