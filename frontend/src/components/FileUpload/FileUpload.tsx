import React, { useState } from "react";

const FileUpload = ({
  title,
  id = "file",
  disabled = false,
}: {
  title?: string;
  id?: string;
  disabled?: boolean;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="col-span-full">
      <label className="block text-sm/6 font-medium text-gray-900">
        {title}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg
            className="mx-auto size-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
          <div className="mt-4 flex text-sm/6 text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              {file ? (
                <span>Attached {file.name}</span>
              ) : (
                <span>Upload a file</span>
              )}
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                accept=".csv"
                disabled={disabled}
                onChange={handleFileChange}
              ></input>
            </label>
            {!file && <p className="pl-1">or drag and drop</p>}
          </div>
          <p className="text-xs/5 text-gray-600">CSV to 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
