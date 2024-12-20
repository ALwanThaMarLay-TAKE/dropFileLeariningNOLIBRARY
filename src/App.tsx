import { ChangeEvent, FormEvent, useRef, useState } from "react";

const App = () => {
  const [files, setFiles] = useState<FileList | null>();
  console.log(files);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent) => {
    console.log("change");

    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFiles(target.files);

    if (typeof files === "undefined") return;

    const formData = new FormData();

    if (files) {
      console.log(files);
      Array.from(files).map((file) => formData.append("files", file));

      for (const [key, value] of formData.entries()) {
        console.log(key, value); // Logs: 'files', each file's name
      }
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
    if (typeof files === "undefined") return;

    const formData = new FormData();

    if (files) {
      console.log(files);
      Array.from(files).map((file) => formData.append("files", file));

      for (const [key, value] of formData.entries()) {
        console.log(key, value); // Logs: 'files', each file's name
      }
    }
  };
  return (
    <div className="p-10 bg-gray-600 min-h-screen flex flex-col     ">
      <div
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        className=" text-3xl text-white flex flex-col gap-2 justify-center items-center text-center  w-1/2 h-80 mx-auto border-dashed border-2 border-white rounded"
      >
        <h1> drop here</h1>
        <form action="">
          <input
            hidden
            onChange={handleChange}
            ref={fileRef}
            type="file"
            multiple
            name="fileInput"
            id=""
          />
          <button
            className="  px-2 py-1 border-blue-500 border-2 rounded text-base"
            type="button"
            onClick={() => fileRef.current?.click()}
          >
            Select Files
          </button>
        </form>
      </div>
      {files && (
        <div className=" flex flex-col gap-3 ">
          {Array.from(files).map((el, index) => (
            <span
              className=" text-lg text-white font-bold font-serif text-center"
              key={index}
            >
              {el.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
