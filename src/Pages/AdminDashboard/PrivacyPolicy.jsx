import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PrivacyPolicy = () => {
  const { handleSubmit, control, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quillContent, setQuillContent] = useState("");
  const [dummyData, setDummyData] = useState(null);

  useEffect(() => {
    const simulateFetch = () => {
      setTimeout(() => {
        const storedData = localStorage.getItem("termsConditionsData");
        const initialContent =
          "By using this platform, you agree to comply with all terms and conditions. Unauthorized use of the platform may result in termination of access. All content provided is for informational purposes only. The platform reserves the right to update these terms at any time, with notifications sent to users. For support, contact our team.";
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setDummyData(parsedData);
          setQuillContent(parsedData.content);
          setValue("content", parsedData.content);
        } else {
          const newData = { id: "1", content: initialContent };
          setDummyData(newData);
          setQuillContent(initialContent);
          setValue("content", initialContent);
          localStorage.setItem("termsConditionsData", JSON.stringify(newData));
        }
      }, 1000);
    };

    simulateFetch();
  }, [setValue]);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedData = { id: dummyData?.id || "1", content: formData.content };
      setDummyData(updatedData);
      localStorage.setItem("termsConditionsData", JSON.stringify(updatedData));

      alert("Terms & Conditions saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save Terms & Conditions:", error);
      alert("Failed to save Terms & Conditions: Simulated error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-blue-500 rounded-lg">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                className="bg-white rounded-lg"
                theme="snow"
                readOnly={!isEditing}
                value={quillContent}
                onChange={(content) => {
                  field.onChange(content);
                  setQuillContent(content);
                }}
                modules={{
                  toolbar: [
                    [{ font: [] }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["bold", "italic", "underline"],
                    [{ align: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                  ],
                }}
              />
            )}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type={isEditing ? "submit" : "button"}
            className={`btn ${
              isEditing ? "btn-primary" : "btn-outline btn-primary"
            } ${isLoading ? "btn-disabled" : ""}`}
            onClick={isEditing ? undefined : () => setIsEditing(true)}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : isEditing ? "SAVE" : "EDIT"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-outline btn-primary"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
            >
              CANCEL
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PrivacyPolicy;
