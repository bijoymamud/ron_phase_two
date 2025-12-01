import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";
import PTSDOthers from "./PTSDOthers";
import OfficialReportSection from "./OfficialReportSection";

const PTSDDetails = () => {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      combat_tramatic_event: false,
      personal_traumatic_event_mst_no: false,
      personal_traumatic_event_mst_yes: false,
      other_traumatic_event: false,
      traumaticEventDetails: [],
      was_an_official_report_field_YES: false,
      was_an_official_report_field_NO: false,
      was_an_official_report_field_RESTRICTED: false,
      was_an_official_report_field_UNRESTRICTED: false,
      was_an_official_report_field_NEITHER: false,
      was_an_official_report_field_POLICE_REPORT: false,
      was_an_official_report_field_POLICE_REPORT_details: "",
      was_an_official_report_field_OTHER: false,
      was_an_official_report_field_OTHER_details: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "traumaticEventDetails",
  });

  const watchedEvents = useWatch({
    control,
    name: [
      "combat_tramatic_event",
      "personal_traumatic_event_mst_no",
      "personal_traumatic_event_mst_yes",
      "other_traumatic_event",
    ],
  });

  const hasAnyEventSelected = watchedEvents?.some(Boolean);

  const addEvent = () => {
    if (fields.length < 6) {
      append({ description: "", location: "", date: "" });
    }
  };

  const handleContinue = () => {
    const allValues = getValues();

    // Get PTSDOthers values from localStorage temporarily
    const ptsdOthersData = JSON.parse(
      localStorage.getItem("ptsdOthersTemp") || "{}"
    );

    const eventDetails = allValues.traumaticEventDetails || [];

    // Only save selected/filled data
    const dataToSave = {
      // Traumatic events
      ...(allValues.combat_tramatic_event && {
        combat_tramatic_event: true,
      }),
      ...(allValues.personal_traumatic_event_mst_no && {
        personal_traumatic_event_mst_no: true,
      }),
      ...(allValues.personal_traumatic_event_mst_yes && {
        personal_traumatic_event_mst_yes: true,
      }),
      ...(allValues.other_traumatic_event && {
        other_traumatic_event: true,
      }),

      // Official report fields
      ...(allValues.was_an_official_report_field_YES && {
        was_an_official_report_field_YES: true,
      }),
      ...(allValues.was_an_official_report_field_NO && {
        was_an_official_report_field_NO: true,
      }),
      ...(allValues.was_an_official_report_field_RESTRICTED && {
        was_an_official_report_field_RESTRICTED: true,
      }),
      ...(allValues.was_an_official_report_field_UNRESTRICTED && {
        was_an_official_report_field_UNRESTRICTED: true,
      }),
      ...(allValues.was_an_official_report_field_NEITHER && {
        was_an_official_report_field_NEITHER: true,
      }),
      ...(allValues.was_an_official_report_field_POLICE_REPORT && {
        was_an_official_report_field_POLICE_REPORT: true,
      }),
      ...(allValues.was_an_official_report_field_POLICE_REPORT_details && {
        was_an_official_report_field_POLICE_REPORT_details:
          allValues.was_an_official_report_field_POLICE_REPORT_details,
      }),
      ...(allValues.was_an_official_report_field_OTHER && {
        was_an_official_report_field_OTHER: true,
      }),
      ...(allValues.was_an_official_report_field_OTHER_details && {
        was_an_official_report_field_OTHER_details:
          allValues.was_an_official_report_field_OTHER_details,
      }),

      // Transform dynamic event fields
      ...eventDetails.reduce((acc, event, index) => {
        const num = index + 1;
        if (event.description || event.location || event.date) {
          return {
            ...acc,
            ...(event.description && {
              [`brief_description_of_the_traumatic_events_number_${num}`]:
                event.description,
            }),
            ...(event.location && {
              [`location_of_the_traumatic_events_number_${num}`]:
                event.location,
            }),
            ...(event.date && {
              [`dates_the_traumatic_events_occured_year_number_${num}`]:
                event.date,
            }),
          };
        }
        return acc;
      }, {}),

      ...ptsdOthersData,
    };

    localStorage.setItem("ptsdDetailsInfo", JSON.stringify(dataToSave));

    localStorage.removeItem("ptsdOthersTemp");

    console.log("Data saved successfully:", dataToSave);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-16 md:px-8 lg:px-20 md:pt-40">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-3xl font-bold text-[#0B2A52] mb-1">
            Information about PTSD
          </h1>
          <p className="text-base text-gray-600">
            Your responses help build a strong VA disability claim. All data is
            saved automatically.
          </p>
        </div>

        {/* Traumatic Events Checkboxes */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#0B2A52] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#0B2A52]">
              Traumatic Event(s)
            </h2>
          </div>
          <p className="text-gray-600 mb-8 ml-4">
            SELECT THE TYPE OF IN-SERVICE TRAUMATIC EVENT(S) YOU EXPERIENCED
            <br />
            (Check more than one, if applicable)
          </p>

          <div className="space-y-5">
            {[
              {
                name: "combat_tramatic_event",
                label: "Combat Traumatic Event(s)",
                desc: "Combat-related injuries or experiences",
              },
              {
                name: "personal_traumatic_event_mst_no",
                label: "Personal Traumatic Event(s)",
                desc: "Not involving military sexual trauma (MST)",
              },
              {
                name: "personal_traumatic_event_mst_yes",
                label:
                  "Personal Traumatic Event(s) - Military Sexual Trauma (MST)",
                desc: "If selected, review Section VI for resources",
                mst: true,
              },
              {
                name: "other_traumatic_event",
                label: "Other Traumatic Event(s)",
                desc: "Any other traumatic experiences",
              },
            ].map((item) => (
              <label
                key={item.name}
                className={`flex items-start p-5 rounded-xl transition-all cursor-pointer group ${
                  item.mst
                    ? "bg-amber-50 border border-amber-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  {...register(item.name)}
                  className="w-6 h-6 mt-0.5 text-[#0B2A52] rounded focus:ring-[#0B2A52]"
                />
                <div className="ml-4 flex-1">
                  <span className="block font-semibold text-[#0B2A52]">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-600">{item.desc}</span>
                  {item.mst && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-amber-300 flex gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-sm text-amber-800">
                        Important MST resources available in Section VI
                      </span>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic Event Details */}
        {hasAnyEventSelected && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#0B2A52]">
                Details of Traumatic Event(s)
              </h2>
              {fields.length < 6 && (
                <button
                  type="button"
                  onClick={addEvent}
                  className="flex items-center gap-2 px-5 py-3 bg-[#0B2A52] hover:bg-[#091f3d] text-white rounded-lg font-medium transition"
                >
                  <Plus size={20} /> Add Event ({fields.length}/6)
                </button>
              )}
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 bg-blue-50 border-b">
                  <h3 className="text-xl font-bold text-[#0B2A52]">
                    Traumatic Event #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg border border-red-200 flex items-center gap-2"
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block font-semibold text-[#0B2A52] mb-2">
                      What happened? *
                    </label>
                    <textarea
                      {...register(
                        `traumaticEventDetails.${index}.description`,
                        { required: "Required" }
                      )}
                      rows={4}
                      className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
                      placeholder="Brief description..."
                    />
                    {errors.traumaticEventDetails?.[index]?.description && (
                      <p className="mt-1 text-red-600 text-sm">
                        Description is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B2A52] mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      {...register(`traumaticEventDetails.${index}.location`, {
                        required: "Required",
                      })}
                      className="w-full px-4 py-3 border dark:bg-white dark:text-gray-900 rounded-lg focus:ring-2 focus:ring-[#0B2A52] outline-none"
                      placeholder="e.g., Iraq, Fort Bragg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#0B2A52] mb-2">
                      Date(s) *
                    </label>
                    <input
                      type="date"
                      {...register(`traumaticEventDetails.${index}.date`, {
                        required: "Required",
                      })}
                      className="w-full px-4 py-3 border rounded-lg dark:bg-white dark:text-gray-900 focus:ring-2 focus:ring-[#0B2A52] outline-none"
                      placeholder="e.g., June 2009, 2011–2013"
                    />
                  </div>
                </div>
              </div>
            ))}

            {fields.length === 6 && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-900">
                Maximum 6 events. Contact support to add more.
              </div>
            )}
          </div>
        )}

        <OfficialReportSection
          register={register}
          control={control}
          setValue={setValue}
        />

        <PTSDOthers />

        {/* Continue Button */}
        <div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="border border-[#091f3d] dark:text-[#091f3d] hover:border-[#091f3d] text-white text-lg font-semibold rounded-lg shadow-lg md:px-10 md:py-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className=" bg-[#B31942] hover:bg-[#be1643] text-white text-lg font-semibold rounded-lg shadow-lg md:px-10 md:py-2"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PTSDDetails;
