export default function Work() {
  return (
    <div className="h-full w-full flex flex-col bg-black rounded-lg shadow-lg shadow-black">
      <div className="bg-black/90 p-2 text-center top-0 z-10 sticky">
        <h2 className="text-white text-3xl font-bold">My Work</h2>
      </div>
      <div className="p-10 flex flex-col gap-3">
        <div className="bg-gray-800 h-20 w-full"></div>
        <div className="bg-gray-800 h-20 w-full"></div>
        <div className="bg-gray-800 h-20 w-full"></div>
        <div className="bg-gray-800 h-20 w-full"></div>
        <div className="bg-gray-800 h-20 w-full"></div>
      </div>
    </div>
  );
}
