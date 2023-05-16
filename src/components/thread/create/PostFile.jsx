export default function PostFile() {
  return (
    <>
      <div className="w-full h-52 flex justify-center items-center gap-3 p-4 border rounded text-lg text-primary focus:outline-none">
        <span>Drag and drop images or</span>
        <label className="px-3 py1 border border-primary rounded-full text-base text-primary font-semibold cursor-pointer">
          <input type="file" className="hidden"></input>
          Upload
        </label>
      </div>
    </>
  );
}
