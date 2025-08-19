import TechCarousel from "@/components/TechCarousel/TechCarousel";

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="flex flex-1 bg-black/30 backdrop-blur-md border-r border-slate-600 hover:border-slate-400 transition-colors duration-300 overflow-hidden">
        <div className="w-full flex flex-col gap-9 items-center">
          <div className="flex flex-col items-center pt-10">
            <div className="overflow-hidden rounded-full h-30 w-30 border-2 border-white shadow-md">
              <img src="profile.png" alt="Profile Picture" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-white text-3xl font-bold">
                Jhonatan Ferreira
              </h1>
              <p className="text-gray-500">Full Stack Developer</p>
            </div>
          </div>
          <div className="w-full px-2 flex-1 place-items-center overflow-hidden z-10">
            <TechCarousel></TechCarousel>
          </div>
          <div className="w-full absolute h-10 bottom-0"></div>
        </div>
      </aside>
      <main className="flex flex-3">
        <section></section>
      </main>
    </div>
  );
}
