export default function Projects() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex flex-col 2xl:flex-row gap-3">
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300">
          <div className="flex h-full gap-5 p-4">
            <div className="flex-2">
              <div className="w-full h-4/5 rounded-lg bg-slate-800/10"></div>
            </div>
            <div className="flex-3 text-gray-400">
              <h3 className="text-xl">Financial Manager</h3>
              <p className="text-white/80 text-sm pb-4">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis.{" "}
              </p>
              <h3 className="text-xl">Tech Stack</h3>
            </div>
          </div>
        </div>
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"></div>
      </div>
      <div className="w-full flex flex-col 2xl:flex-row gap-3">
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"></div>
        <div className="w-full h-80 bg-black rounded-lg  border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 transition-colors duration-300"></div>
      </div>
    </div>
  );
}
