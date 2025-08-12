import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function GulfWarLocationsForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      List_Other_Locations_Where_You_Served: [],
    },
  });

  const selectedLocations = watch("List_Other_Locations_Where_You_Served");

  const handleCheckboxChange = (location, isChecked) => {
    if (isChecked) {
      setValue("List_Other_Locations_Where_You_Served", [
        ...selectedLocations,
        location,
      ]);
    } else {
      setValue(
        "List_Other_Locations_Where_You_Served",
        selectedLocations.filter((loc) => loc !== location)
      );
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem("gulfWarLocations", JSON.stringify(data));
    navigate("/agent_location");
  };

  const locations = [
    "Iraq",
    "Kuwait",
    "Saudi Arabia",
    "Saudi Neutral Zone",
    "Bahrain",
    "Qatar",
    "Persian Gulf",
    "UAE",
    "Israel",
    "Egypt",
    "Turkey",
    "Syria",
    "Jordan",
    "Djibouti",
    "Uzbekistan",
    "Arabian Sea",
    "Oman",
    "Yemen",
    "Lebanon",
    "Somalia",
    "Afghanistan",
    "Gulf Of Aden",
    "Gulf Of Oman",
    "Red Sea",
  ];

  return (
    <div className="min-h-screen bg-white flex justify-center items-center md:p-4 p-2 pt-32 md:pt-0">
      <div className="w-full max-w-5xl h-full md:bg-white md:shadow-md  md:border-none rounded-lg md:p-6">
        <h1 className="md:text-2xl text-lg font-bold text-blue-800 mb-6 text-center">
          Have you worked in the following Gulf War-risk locations?
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Checkboxes for locations */}
          <div className="grid grid-cols-2 md:grid-cols-4 ps-2 md:ps-0 gap-4 md:mt-20 mt-10">
            {locations.map((location) => (
              <label key={location} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 dark:text-white border-gray-300 rounded focus:ring-blue-500"
                  checked={selectedLocations.includes(location)}
                  onChange={(e) =>
                    handleCheckboxChange(location, e.target.checked)
                  }
                />
                <span className="text-blue-800 md:text-base text-[13px]">
                  {location}
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-center gap-4 md:gap-10 mt-10 pt-10 md:mt-6 md:pt-10 md:pb-10">
            {/* Back Button */}
            <button
              type="button"
              className="w-[150px] md:w-[200px] bg-white text-blue-800 py-2 border uppercase border-blue-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
              onClick={() => window.history.back()}
            >
              Back
            </button>

            {/* Continue Button */}
            <Link
              onClick={handleSubmit(onSubmit)}
              className="w-[150px] md:w-[200px] bg-[#B31942] text-white py-2 rounded-md hover:bg-[#aa2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold text-center flex items-center justify-center"
            >
              Continue
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GulfWarLocationsForm;
