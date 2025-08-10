import { useState } from 'react';
import { useUploadDDOneFourMutation } from '../../redux/features/baseApi';
import { toast, Toaster } from 'sonner';
import { HiUpload } from 'react-icons/hi';

const DD214 = () => {
 const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadDDOneFourDoc, { isLoading }] = useUploadDDOneFourMutation();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"/ "image/pdf"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, or GIF, PDF).");
        return;
      }

      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitFile = async () => {
    if (!uploadedFile) {
      toast.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const res = await uploadDDOneFourDoc(formData).unwrap();
      toast.success("Document uploaded successfully!");
      console.log({res});
    } catch (error) {
      toast.error("Something went wrong during upload.");
      console.error(error);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
  };

    return (
    <section className="h-screen bg-gray-200 flex flex-col justify-center items-center pt-10 px-2 md:px-0">
      <Toaster />
      <h1 className="text-[#0A3161] md:text-4xl text-xl text-center font-bold pb-10">
        DD-214 Upload & Auto-Population
      </h1>

      <div className="bg-white md:p-20 flex items-center justify-center md:h-[50vh] md:w-[50vw] h-[60vh] w-full md:px-0 shadow-lg rounded-lg">
        <div className="flex flex-col items-center justify-center">
          {uploadedFile ? (
            <div className="text-center px-2 md:px-0">
              <h2 className="text-xl dark:text-black text-black font-semibold mb-4">Uploaded File:</h2>
              {uploadedFile.type.startsWith("image/") ? (
                <img
                  src={previewUrl}
                  alt="Uploaded file preview"
                  className="max-w-full max-h-64 rounded-md"
                />
              ) : (
                <p className="text-gray-600">{uploadedFile.name}</p>
              )}

              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                <button
                  onClick={handleSubmitFile}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? "Uploading..." : "Submit File"}
                </button>
                <button
                  onClick={handleRemoveFile}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove File
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-900">Upload File</h1>
              <div className="border-2 border-dashed border-blue-500 w-80 h-40 flex items-center justify-center rounded-md">
                <label className="flex flex-col items-center cursor-pointer">
                 <HiUpload size={32} className='mb-2 text-gray-900 dark:text-gray-900' />

                  <span className="text-blue-500">Click to Upload or drag and drop</span>
                  <span className="text-gray-400 text-sm">(Max. file size: 50 MB)</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    );
  };

  export default DD214;