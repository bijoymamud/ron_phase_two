import { useState } from "react";
import { useWatch } from "react-hook-form";

const OfficialReportSection = ({ register, control, setValue }) => {
  const [showPoliceReportInput, setShowPoliceReportInput] = useState(false);
  const [showOtherTextarea, setShowOtherTextarea] = useState(false);

  const showYesChecked = useWatch({
    control,
    name: "was_an_official_report_field_YES",
  });

  const handleMainCheckboxChange = (value, checked) => {
    setValue(value, checked);

    if (value === "was_an_official_report_field_YES" && !checked) {
      setValue("was_an_official_report_field_RESTRICTED", false);
      setValue("was_an_official_report_field_UNRESTRICTED", false);
      setValue("was_an_official_report_field_NEITHER", false);
      setValue("was_an_official_report_field_POLICE_REPORT", false);
      setValue("was_an_official_report_field_OTHER", false);
      setValue("was_an_official_report_field_POLICE_REPORT_details", "");
      setValue("was_an_official_report_field_OTHER_details", "");
      setShowPoliceReportInput(false);
      setShowOtherTextarea(false);
    }

    // If checking YES and NO is checked, uncheck NO
    if (value === "was_an_official_report_field_YES" && checked) {
      setValue("was_an_official_report_field_NO", false);
    }

    // If checking NO and YES is checked, uncheck YES and all sub-options
    if (value === "was_an_official_report_field_NO" && checked) {
      setValue("was_an_official_report_field_YES", false);
      setValue("was_an_official_report_field_RESTRICTED", false);
      setValue("was_an_official_report_field_UNRESTRICTED", false);
      setValue("was_an_official_report_field_NEITHER", false);
      setValue("was_an_official_report_field_POLICE_REPORT", false);
      setValue("was_an_official_report_field_OTHER", false);
      setValue("was_an_official_report_field_POLICE_REPORT_details", "");
      setValue("was_an_official_report_field_OTHER_details", "");
      setShowPoliceReportInput(false);
      setShowOtherTextarea(false);
    }
  };

  const handleSubCheckboxChange = (value, checked) => {
    // Uncheck all other sub-options when one is selected
    if (checked) {
      if (value !== "was_an_official_report_field_RESTRICTED") {
        setValue("was_an_official_report_field_RESTRICTED", false);
      }
      if (value !== "was_an_official_report_field_UNRESTRICTED") {
        setValue("was_an_official_report_field_UNRESTRICTED", false);
      }
      if (value !== "was_an_official_report_field_NEITHER") {
        setValue("was_an_official_report_field_NEITHER", false);
      }
      if (value !== "was_an_official_report_field_POLICE_REPORT") {
        setValue("was_an_official_report_field_POLICE_REPORT", false);
        setShowPoliceReportInput(false);
        setValue("was_an_official_report_field_POLICE_REPORT_details", "");
      }
      if (value !== "was_an_official_report_field_OTHER") {
        setValue("was_an_official_report_field_OTHER", false);
        setShowOtherTextarea(false);
        setValue("was_an_official_report_field_OTHER_details", "");
      }
    }

    setValue(value, checked);

    // Show/hide conditional inputs
    if (value === "was_an_official_report_field_POLICE_REPORT") {
      setShowPoliceReportInput(checked);
      if (!checked) {
        setValue("was_an_official_report_field_POLICE_REPORT_details", "");
      }
    }

    if (value === "was_an_official_report_field_OTHER") {
      setShowOtherTextarea(checked);
      if (!checked) {
        setValue("was_an_official_report_field_OTHER_details", "");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#0B2A52] rounded-full"></div>
        <h3 className="text-2xl font-bold text-[#0B2A52]">
          WAS AN OFFICIAL REPORT FILED?
        </h3>
      </div>

      <div className="space-y-4 ml-4">
        {/* YES Option */}
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("was_an_official_report_field_YES")}
              onChange={(e) =>
                handleMainCheckboxChange(
                  "was_an_official_report_field_YES",
                  e.target.checked
                )
              }
              className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
            />
            <span className="text-gray-700 font-medium">Yes</span>
          </label>

          {/* Sub-options that appear when YES is checked */}
          {showYesChecked && (
            <div className="ml-8 space-y-3 pl-4 border-l-2 border-gray-300">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("was_an_official_report_field_RESTRICTED")}
                  onChange={(e) =>
                    handleSubCheckboxChange(
                      "was_an_official_report_field_RESTRICTED",
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
                />
                <span className="text-gray-700 font-medium">RESTRICTED</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("was_an_official_report_field_UNRESTRICTED")}
                  onChange={(e) =>
                    handleSubCheckboxChange(
                      "was_an_official_report_field_UNRESTRICTED",
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
                />
                <span className="text-gray-700 font-medium">UNRESTRICTED</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("was_an_official_report_field_NEITHER")}
                  onChange={(e) =>
                    handleSubCheckboxChange(
                      "was_an_official_report_field_NEITHER",
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
                />
                <span className="text-gray-700 font-medium">NEITHER</span>
              </label>

              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("was_an_official_report_field_POLICE_REPORT")}
                    onChange={(e) =>
                      handleSubCheckboxChange(
                        "was_an_official_report_field_POLICE_REPORT",
                        e.target.checked
                      )
                    }
                    className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
                  />
                  <span className="text-gray-700 font-medium">
                    POLICE REPORT
                  </span>
                </label>

                {showPoliceReportInput && (
                  <input
                    type="text"
                    {...register(
                      "was_an_official_report_field_POLICE_REPORT_details"
                    )}
                    placeholder="Enter police report details"
                    className="w-full px-4 py-3 ml-8 border border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("was_an_official_report_field_OTHER")}
                    onChange={(e) =>
                      handleSubCheckboxChange(
                        "was_an_official_report_field_OTHER",
                        e.target.checked
                      )
                    }
                    className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
                  />
                  <span className="text-gray-700 font-medium">OTHER</span>
                </label>

                {showOtherTextarea && (
                  <textarea
                    {...register("was_an_official_report_field_OTHER_details")}
                    placeholder="Please specify..."
                    rows={3}
                    className="w-full px-4 py-3 ml-8 border border-gray-300 dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none resize-none"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* NO Option */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("was_an_official_report_field_NO")}
            onChange={(e) =>
              handleMainCheckboxChange(
                "was_an_official_report_field_NO",
                e.target.checked
              )
            }
            className="w-5 h-5 text-[#0B2A52] border-gray-300 rounded focus:ring-[#0B2A52]"
          />
          <span className="text-gray-700 font-medium">No</span>
        </label>
      </div>
    </div>
  );
};

export default OfficialReportSection;
